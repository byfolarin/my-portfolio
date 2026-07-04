// Edit this file to manage the reading list.
// `summary` is your take on the book, shown on its detail page — I seeded
// each with a neutral description; replace them with your own words.
// Covers are generated typographically from the title/author using a
// rotating palette. To use a real cover, drop an image in /public/books
// and set `cover: "/books/name.jpg"` on the entry. `href` becomes a
// "Get the book" link on the detail page.

export type Book = {
  title: string;
  author: string;
  year: string;
  summary: string;
  href?: string;
  cover?: string;
};

export const palettes: { bg: string; fg: string }[] = [
  { bg: "#1a1a1a", fg: "#f5f4ef" },
  { bg: "#e9e5db", fg: "#1a1a1a" },
  { bg: "#12372a", fg: "#efece2" },
  { bg: "#dde3ea", fg: "#16283a" },
  { bg: "#5b3a2e", fg: "#f2e9df" },
  { bg: "#f0ece4", fg: "#3b3226" },
  { bg: "#2b3040", fg: "#e8eaf0" },
  { bg: "#c7cfc4", fg: "#22301f" },
  { bg: "#83322a", fg: "#f4e8e2" },
  { bg: "#e3d9c8", fg: "#4a3520" },
  { bg: "#243b53", fg: "#dfe8f0" },
  { bg: "#d9cfe3", fg: "#32243f" },
  { bg: "#3f4a3c", fg: "#e6ebe0" },
  { bg: "#f2e2d2", fg: "#5c3a1e" },
  { bg: "#22252a", fg: "#d9dde3" },
  { bg: "#cbd8d2", fg: "#1f3a30" },
];

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const books: Book[] = [
  { title: "The Design of Everyday Things", author: "Don Norman", year: "2026", summary: "Norman's classic on why some objects are a joy to use and others fight you — affordances, signifiers, and the idea that when people struggle with a design, it's the design's fault. The book that gives designers the vocabulary to defend good decisions." },
  { title: "Creative Selection", author: "Ken Kocienda", year: "2026", summary: "An inside look at how Apple built the iPhone keyboard and Safari — demo-driven development, taste as a process, and small empowered teams. The best account I've read of what craft looks like inside a company that ships." },
  { title: "The Creative Act", author: "Rick Rubin", year: "2026", summary: "Rubin treats creativity as a way of being rather than a job function. Short chapters, almost devotional. Good for slowing down and remembering why you make things at all." },
  { title: "Refactoring UI", author: "Wathan & Schoger", year: "2026", summary: "The most immediately practical design book there is — spacing systems, hierarchy, color, shadows, all shown as before/after. I revisit it whenever a screen feels off and I can't say why." },
  { title: "Grid Systems in Graphic Design", author: "Josef Müller-Brockmann", year: "2026", summary: "The Swiss bible of layout. Rigid, opinionated, and beautiful — even if you never follow a grid this strictly, it changes how you see alignment forever." },
  { title: "The Elements of Typographic Style", author: "Robert Bringhurst", year: "2026", summary: "Part manual, part poetry, entirely about honoring the text. Bringhurst writes about type the way theologians write about scripture. Dense, worth it." },
  { title: "Thinking with Type", author: "Ellen Lupton", year: "2026", summary: "The friendliest serious introduction to typography — letter, text, grid. Where I point anyone who wants to actually understand type instead of just picking fonts." },
  { title: "Interaction of Color", author: "Josef Albers", year: "2026", summary: "Albers proves color is relative — the same swatch changes completely depending on its neighbors. A book you do more than read; it rewired how I choose palettes." },
  { title: "Dieter Rams: Less but Better", author: "Dieter Rams", year: "2026", summary: "The ten principles, straight from the source, with the Braun work that earned them. A reminder that restraint is a feature and good design is as little design as possible." },
  { title: "The Shape of Design", author: "Frank Chimero", year: "2026", summary: "Less about how to design, more about why. Chimero writes about improvisation, gifts, and making things with love. Short, generous, re-readable." },
  { title: "Laws of UX", author: "Jon Yablonski", year: "2025", summary: "Psychology principles — Hick's Law, Fitts's Law, Jakob's Law — mapped cleanly onto interface decisions. Handy shared language for design reviews." },
  { title: "About Face", author: "Alan Cooper", year: "2025", summary: "The big textbook of interaction design — goal-directed design, personas, and why software should behave like a considerate human. Long, but the foundations hold up." },
  { title: "Don't Make Me Think", author: "Steve Krug", year: "2025", summary: "Usability distilled to one commandment. Twenty-plus years old and still the fastest way to internalize how people actually scan and click through interfaces." },
  { title: "Articulating Design Decisions", author: "Tom Greever", year: "2025", summary: "The skill nobody teaches: talking about design so stakeholders trust you. Changed how I run reviews — describe the problem, the goal, then the decision." },
  { title: "Design Is a Job", author: "Mike Monteiro", year: "2025", summary: "Blunt advice on the business side of design — clients, contracts, getting paid, saying no. Monteiro treats professionalism as part of the craft, and he's right." },
  { title: "Ruined by Design", author: "Mike Monteiro", year: "2025", summary: "An angry, necessary book about the harm design can do and the responsibility that comes with the job. Uncomfortable in a useful way." },
  { title: "Emotional Design", author: "Don Norman", year: "2025", summary: "Norman's follow-up argues attractive things work better — visceral, behavioral, and reflective levels of design. The case for delight being functional, not decoration." },
  { title: "Sprint", author: "Jake Knapp", year: "2025", summary: "The five-day recipe for answering big product questions with a prototype and real users. I borrow pieces of it constantly even when there's no formal sprint." },
  { title: "Hooked", author: "Nir Eyal", year: "2025", summary: "The trigger-action-reward-investment loop behind habit-forming products. Read it both as a playbook and as a warning about what you're building." },
  { title: "Make Something Wonderful", author: "Steve Jobs", year: "2025", summary: "Jobs in his own words — speeches, emails, interviews, beautifully edited. The clearest window into how he thought about products, taste, and time." },
  { title: "Inspired", author: "Marty Cagan", year: "2025", summary: "The standard text on how strong product teams work — empowered teams, continuous discovery, outcomes over output. Useful for designers who want a seat at that table." },
  { title: "Continuous Discovery Habits", author: "Teresa Torres", year: "2025", summary: "Weekly customer touchpoints, opportunity solution trees, small bets. The most actionable book on making research a habit instead of a phase." },
  { title: "Build", author: "Tony Fadell", year: "2025", summary: "Fadell's unfiltered mentor-in-a-book — from iPod and Nest, on careers, products, and building teams. Reads like advice from someone who's actually done it, because he has." },
  { title: "Zero to One", author: "Peter Thiel", year: "2025", summary: "Contrarian notes on startups — competition is for losers, secrets matter, aim for monopoly. Disagree with half of it and it still sharpens your thinking." },
  { title: "The Lean Startup", author: "Eric Ries", year: "2025", summary: "Build-measure-learn and the MVP, the vocabulary every product team now speaks. Worth reading the original instead of the summaries everyone repeats." },
  { title: "The Mom Test", author: "Rob Fitzpatrick", year: "2025", summary: "How to ask customers questions that don't invite polite lies. Tiny book, permanent upgrade to every user interview you'll ever run." },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", year: "2025", summary: "Honest war stories about the ugly parts of running a company — layoffs, demotions, fear. The antidote to tidy startup advice." },
  { title: "Obviously Awesome", author: "April Dunford", year: "2025", summary: "The clearest framework for positioning — what you are, who it's for, why you win. Positioning is design at the company level, and this is its manual." },
  { title: "Good Strategy Bad Strategy", author: "Richard Rumelt", year: "2025", summary: "Rumelt's kernel — diagnosis, guiding policy, coherent action — and a demolition of fluffy vision statements pretending to be strategy. Applies to design roadmaps too." },
  { title: "The Psychology of Money", author: "Morgan Housel", year: "2025", summary: "Twenty short essays on how people actually behave with money — luck, greed, compounding, enough. Especially resonant working in fintech." },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", year: "2024", summary: "Naval's ideas on wealth and happiness, compiled — specific knowledge, leverage, judgment. Skimmable and dense at the same time." },
  { title: "Atomic Habits", author: "James Clear", year: "2024", summary: "Systems over goals, identity over outcomes, one percent better. Deserves its reputation — the mechanics genuinely work when applied." },
  { title: "Deep Work", author: "Cal Newport", year: "2024", summary: "The case that focused, undistracted work is a superpower and a discipline. Design work is deep work; this book made me protect it on my calendar." },
  { title: "Digital Minimalism", author: "Cal Newport", year: "2024", summary: "Newport's philosophy for taking back attention from apps engineered to capture it. Ironic reading for someone who designs apps — which is exactly why it's useful." },
  { title: "Essentialism", author: "Greg McKeown", year: "2024", summary: "The disciplined pursuit of less — do fewer things, deliberately chosen, done well. Basically Rams's principle applied to your life instead of your products." },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: "2024", summary: "System 1 and System 2, anchoring, loss aversion — the cognitive biases underneath every user decision. Slow reading, but it's the source material for half of UX psychology." },
  { title: "Range", author: "David Epstein", year: "2024", summary: "Why generalists win in wicked domains — sampling widely beats early specialization. Encouraging for designers whose careers zigzag across brand, product, and systems." },
  { title: "Outliers", author: "Malcolm Gladwell", year: "2024", summary: "Success as circumstance plus accumulated advantage — birth dates, 10,000 hours, culture. Gladwell at his most compelling, even where the science gets debated." },
  { title: "The Tipping Point", author: "Malcolm Gladwell", year: "2024", summary: "How ideas spread — connectors, mavens, salesmen, and the stickiness factor. Dated in places but still shapes how I think about product adoption." },
  { title: "Steal Like an Artist", author: "Austin Kleon", year: "2024", summary: "Nothing is original and that's fine — collect good influences and remix them honestly. A permission slip disguised as a book, readable in an hour." },
  { title: "Show Your Work", author: "Austin Kleon", year: "2024", summary: "The sequel argues you should share the process, not just the outcome. The reason this site exists, honestly." },
  { title: "Things Fall Apart", author: "Chinua Achebe", year: "2024", summary: "Achebe's masterpiece — Okonkwo, Umuofia, and the collision of Igbo society with colonialism. Required reading, and better every time I return to it." },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", year: "2024", summary: "The Biafran war told through people you come to love. Devastating and beautiful — Adichie makes history personal in a way textbooks never could." },
  { title: "Americanah", author: "Chimamanda Ngozi Adichie", year: "2023", summary: "Ifemelu, Obinze, and the Nigerian experience of America and back again. Sharp on race, identity, and the strange gravity of home." },
  { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", year: "2023", summary: "Adichie's quiet first novel — faith, silence, and control inside a Nigerian family. Smaller in scope than her later work and no less piercing." },
  { title: "The Alchemist", author: "Paulo Coelho", year: "2023", summary: "Santiago's fable about following your Personal Legend. Simple, sentimental, and it still lands when you read it at the right moment in life." },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", year: "2023", summary: "Frankl survives the camps and concludes meaning — not pleasure or power — is what keeps people alive. One of the few books that deserves the word life-changing." },
  { title: "Mere Christianity", author: "C.S. Lewis", year: "2023", summary: "Lewis's wartime radio talks, turned into the most lucid case for the faith I've read. He argues with warmth and logic in equal measure." },
  { title: "The Screwtape Letters", author: "C.S. Lewis", year: "2023", summary: "Temptation written as workplace memos from a senior demon to his nephew. Funny, uncomfortable, and more perceptive about human nature than most psychology books." },
  { title: "The Ruthless Elimination of Hurry", author: "John Mark Comer", year: "2023", summary: "Comer on hurry as the great enemy of spiritual life — silence, sabbath, simplicity. A hard read in the best way for anyone whose calendar looks like mine." },
];

export function getBook(slug: string) {
  return books.find((b) => slugify(b.title) === slug);
}

export function bookIndex(slug: string) {
  return books.findIndex((b) => slugify(b.title) === slug);
}
