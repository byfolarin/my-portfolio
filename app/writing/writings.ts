// Edit this file to manage the writings shelf.
// Each essay is a book: `spine` colors it, `height`/`thick` shape it on the
// shelf (rem units). `paragraphs` is the essay body — first paragraph gets
// the drop cap. These four are seeded drafts; make them yours.

export type Writing = {
  slug: string;
  title: string;
  date: string;
  minutes: number;
  excerpt: string;
  spine: { bg: string; fg: string };
  height: number;
  thick: number;
  paragraphs: string[];
};

export const writings: Writing[] = [
  {
    slug: "the-details-are-the-design",
    title: "The Details Are the Design",
    date: "Mar 2026",
    minutes: 4,
    excerpt: "Craft isn't the polish you add at the end. It's the whole thing.",
    spine: { bg: "#12372a", fg: "#efece2" },
    height: 14,
    thick: 3,
    paragraphs: [
      "People talk about craft like it's a finishing step — the polish you apply once the real work is done. Ship the feature, then tidy the spacing. I've come to believe the opposite: the details are not the last mile of the design. They are the design.",
      "A button that sits one pixel off its baseline doesn't just look slightly wrong. It tells the user, quietly, that nobody here is paying attention. Every hairline, every easing curve, every label is a small promise about how much the people behind the product care. Users can't always articulate it, but they always feel it.",
      "This is why I distrust the phrase \"pixel pushing\" as an insult. Pushing pixels is the job the same way choosing words is the writer's job. Nobody accuses a novelist of \"word pushing\" for agonizing over a sentence.",
      "The hard part is that details are expensive precisely when you're moving fast. At a startup, the pressure to skip them is constant and reasonable-sounding. The trick I've learned is to make craft cheap: a design system that defaults to correct spacing, a type scale you never have to think about, components where the considered choice is the lazy choice.",
      "That's what people miss about systems work — it looks like bureaucracy, but done well it's the opposite. It's how a two-designer team ships work that feels like a twenty-designer team's, without slowing down.",
      "So no, craft isn't the coat of paint. It's the carpentry. And the products people love — the ones that feel considered — are the ones where somebody decided the details were the work, and staffed, planned, and fought accordingly.",
    ],
  },
  {
    slug: "designing-money-for-lagos",
    title: "Designing Money for Lagos",
    date: "Jan 2026",
    minutes: 5,
    excerpt: "What fintech design looks like when your users' trust is earned in naira.",
    spine: { bg: "#243b53", fg: "#dfe8f0" },
    height: 12.75,
    thick: 2.625,
    paragraphs: [
      "Most fintech design patterns were invented for people who already trust banks. The onboarding flows, the cheerful empty states, the confetti after your first deposit — they assume a user whose money has always been safe, for whom an app is just a nicer interface to a system that works.",
      "Lagos teaches you different assumptions. Here, trust is not a default; it's earned transaction by transaction. A user sending money across a border is often sending a meaningful fraction of everything they have, to someone who needs it urgently, through rails they have every historical reason to doubt.",
      "That changes what good design means. Progress indicators aren't decoration — they're anxiety management. A transfer that says \"processing\" for ninety seconds without explanation isn't a loading state, it's a small crisis. We learned to over-communicate: what's happening, how long it usually takes, what to do if it doesn't.",
      "It also changes the aesthetics. Playfulness reads differently when the stakes are rent money. We aim for an interface that feels like a competent bank teller — warm, but never casual about your money. Serious without being cold.",
      "And it changes what you celebrate. The confetti moment in our world isn't the first deposit. It's the message from the cousin in Ibadan saying the money arrived. Design for that moment — the one that happens outside your app — and the inside of the app gets clearer.",
      "I think the next decade of great fintech design comes from markets like this one, because designing for earned trust makes you honest in a way designing for assumed trust never will.",
    ],
  },
  {
    slug: "a-design-system-is-a-promise",
    title: "A Design System Is a Promise",
    date: "Nov 2025",
    minutes: 4,
    excerpt: "What I learned building HDS: the system is social before it's technical.",
    spine: { bg: "#83322a", fg: "#f4e8e2" },
    height: 12,
    thick: 2.375,
    paragraphs: [
      "When I started building HDS, I thought the deliverable was a component library. Buttons, inputs, tokens, documentation — the artifacts. I finished the artifacts and discovered I'd barely started.",
      "A design system is a promise between people. The designer promises the engineer that the spec is the spec — no surprise variants hiding in a detached frame. The engineer promises the designer that what ships matches what was drawn. The system is just the written form of that promise.",
      "This is why systems fail socially before they fail technically. A perfect token architecture that the team routes around is worth less than a mediocre one everyone actually uses. Adoption isn't a phase after the build; it is the build.",
      "The redesign of 127 transactional emails taught me this at scale. The hard part wasn't designing one beautiful email — it was designing the constraint set that made 127 emails feel like one voice, built by different people, over months, without me reviewing each one.",
      "My test for a good system now: can someone make a correct screen without asking me anything? Every question a designer or engineer has to ask is a gap in the promise.",
      "Build the components, yes. But spend equal time on the sentences — the naming, the docs, the defaults. The system succeeds in the moments you're not in the room.",
    ],
  },
  {
    slug: "reading-as-a-design-practice",
    title: "Reading as a Design Practice",
    date: "Aug 2025",
    minutes: 3,
    excerpt: "Fifty books a year isn't a hobby beside the work. It's how the work gets better.",
    spine: { bg: "#5b3a2e", fg: "#f2e9df" },
    height: 10.75,
    thick: 2.25,
    paragraphs: [
      "Designers are told to study interfaces. Collect screenshots, dissect flows, know the patterns. Useful, but it produces a strange sameness — everyone studying the same apps arrives at the same screens.",
      "Books are my way out of that loop. Almost none of what has improved my design work came from design books alone. Kahneman taught me more about onboarding than any teardown — because onboarding is a parade of System 1 judgments. Achebe taught me about voice, and voice is what a brand actually is.",
      "Reading fiction especially. A novelist's whole craft is managing what the reader knows, feels, and expects, sentence by sentence. That is interaction design with a publishing deal. The pacing of a chapter and the pacing of a flow are the same discipline.",
      "There's also the humility of it. An interface asks for seconds of attention; a book asks for hours, and earns them or doesn't. Studying how 400 pages hold a human being teaches you respect for attention that no dashboard ever will.",
      "So I keep the shelf full and the notes honest. Fifty books a year sounds like a lot until you treat it as what it is — not a hobby beside the practice, but the practice itself, wearing a different cover.",
    ],
  },
];

export function getWriting(slug: string) {
  return writings.findIndex((w) => w.slug === slug);
}

export function roman(n: number) {
  const table: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [v, sym] of table) {
    while (n >= v) {
      out += sym;
      n -= v;
    }
  }
  return out;
}
