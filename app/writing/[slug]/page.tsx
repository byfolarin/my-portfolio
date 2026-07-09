import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Clock from "../../clock";
import BackLink from "../../back-link";
import { writings, getWriting, roman } from "../writings";

export function generateStaticParams() {
  return writings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const index = getWriting(slug);
  if (index === -1) return {};
  const w = writings[index];
  return {
    title: `${w.title} — Folarin Folarin`,
    description: w.excerpt,
  };
}

export default async function Essay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = getWriting(slug);
  if (index === -1) notFound();

  const w = writings[index];
  const prev = writings[index + 1]; // shelf is newest-first; "previous" is older
  const next = writings[index - 1];

  return (
    <div className="homepage">
      <div className="detail-top">
        <BackLink href="/writing" label="Writings" />
        <span className="detail-count">
          {roman(index + 1)} / {roman(writings.length)}
        </span>
      </div>

      <article className="essay">
        <header className="essay-head">
          <span className="essay-no">Essay {roman(index + 1)}</span>
          <h1>{w.title}</h1>
          <time>
            {w.date} · {w.minutes} minute read
          </time>
        </header>

        <div className="essay-body">
          {w.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="essay-end" aria-hidden>
          ❦
        </div>
      </article>

      <nav className="detail-nav">
        {prev ? (
          <Link href={`/writing/${prev.slug}`}>← {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/writing/${next.slug}`}>{next.title} →</Link>
        ) : (
          <span />
        )}
      </nav>

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
