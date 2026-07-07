import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { books } from "../../reading/books";
import { projects } from "../../projects/projects";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Per-IP rate limit: 10 questions per hour. In-memory, so it's per serverless
// instance — a soft guard against runaway bills, not a hard one.
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function systemPrompt() {
  const projectLines = projects
    .map((p) => `- ${p.name} (${p.role}, ${p.period}): ${p.description}`)
    .join("\n");
  const bookLines = books
    .map((b) => `- "${b.title}" by ${b.author} (read in ${b.year})`)
    .join("\n");

  return `You are the assistant on the personal portfolio website of Folarin Folarin. Visitors type questions and you answer them about Folarin and his work. Refer to him as "Folarin" or "he" — you are not him.

FACTS ABOUT FOLARIN:
- Product designer based in Lagos, Nigeria.
- Currently Lead Product Designer at Kredete (kredete.com), a fintech helping Africans build credit and move money across borders.
- Cares deeply about craft: typography, spacing, and the small details that make software feel considered.
- Contact: folarin@kredete.com. GitHub: github.com/byfolarin.
- This site: Home (/), Reading (/reading) with his 50-book reading list where each book renders as an interactive 3D hardcover with his notes, About (/about), Projects (/projects), Writings (/writing, coming soon), and Music (/music), a three.js CD player wired live to his Spotify — it shows what he's actually listening to right now.
- He built this site with Next.js, Tailwind, react-three-fiber, and GSAP.

PROJECTS:
${projectLines}

EXPERIENCE:
- Kredete — Lead Product Designer, 2024–Present
- Hinstantt — Product Designer, 2025–2026
- Gravv — Brand & Product Designer, 2026
- Selah — Founding Designer, 2025

HIS READING LIST (${books.length} books):
${bookLines}

RULES:
- Only answer questions about Folarin, his work, his site, his reading, or how to reach him. For anything unrelated (coding help, general knowledge, other people), politely say you're just here to talk about Folarin and suggest they ask about him instead.
- Keep answers short: 1-4 sentences, conversational, warm. No headers or bullet lists unless listing books or projects.
- Plain text only — no markdown, no asterisks, no formatting syntax. Your answer renders as-is.
- Don't invent facts. If you don't know something about him, say so and point to the email.
- Never share anything beyond what's listed here. Decline questions about salary, address, or private life gracefully.
- If asked about hiring or working together, be encouraging and point to folarin@kredete.com.`;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many questions — try again in a bit." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // conversation thread: alternating user/assistant, ending on a user turn
  const raw = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  const messages: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of raw) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    if (m.role === "user" && m.content.length > 300) {
      return NextResponse.json(
        { error: "Ask a question up to 300 characters." },
        { status: 400 }
      );
    }
    messages.push({ role: m.role, content: m.content.slice(0, 4000).trim() });
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const runner = client.messages.stream({
          model: "claude-opus-4-8",
          max_tokens: 600,
          system: systemPrompt(),
          messages,
        });
        runner.on("text", (text) => controller.enqueue(encoder.encode(text)));
        await runner.finalMessage();
        controller.close();
      } catch {
        controller.enqueue(
          encoder.encode("Something went wrong — try again in a moment.")
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
