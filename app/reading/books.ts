// Edit this file to manage the reading list.
// Covers are generated typographically from the title/author using a
// rotating palette. To use a real cover, drop an image in /public/books
// and set `cover: "/books/name.jpg"` on the entry.

export type Book = {
  title: string;
  author: string;
  year: string;
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

export const books: Book[] = [
  { title: "The Design of Everyday Things", author: "Don Norman", year: "2026" },
  { title: "Creative Selection", author: "Ken Kocienda", year: "2026" },
  { title: "The Creative Act", author: "Rick Rubin", year: "2026" },
  { title: "Refactoring UI", author: "Wathan & Schoger", year: "2026" },
  { title: "Grid Systems in Graphic Design", author: "Josef Müller-Brockmann", year: "2026" },
  { title: "The Elements of Typographic Style", author: "Robert Bringhurst", year: "2026" },
  { title: "Thinking with Type", author: "Ellen Lupton", year: "2026" },
  { title: "Interaction of Color", author: "Josef Albers", year: "2026" },
  { title: "Dieter Rams: Less but Better", author: "Dieter Rams", year: "2026" },
  { title: "The Shape of Design", author: "Frank Chimero", year: "2026" },
  { title: "Laws of UX", author: "Jon Yablonski", year: "2025" },
  { title: "About Face", author: "Alan Cooper", year: "2025" },
  { title: "Don't Make Me Think", author: "Steve Krug", year: "2025" },
  { title: "Articulating Design Decisions", author: "Tom Greever", year: "2025" },
  { title: "Design Is a Job", author: "Mike Monteiro", year: "2025" },
  { title: "Ruined by Design", author: "Mike Monteiro", year: "2025" },
  { title: "Emotional Design", author: "Don Norman", year: "2025" },
  { title: "Sprint", author: "Jake Knapp", year: "2025" },
  { title: "Hooked", author: "Nir Eyal", year: "2025" },
  { title: "Make Something Wonderful", author: "Steve Jobs", year: "2025" },
  { title: "Inspired", author: "Marty Cagan", year: "2025" },
  { title: "Continuous Discovery Habits", author: "Teresa Torres", year: "2025" },
  { title: "Build", author: "Tony Fadell", year: "2025" },
  { title: "Zero to One", author: "Peter Thiel", year: "2025" },
  { title: "The Lean Startup", author: "Eric Ries", year: "2025" },
  { title: "The Mom Test", author: "Rob Fitzpatrick", year: "2025" },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", year: "2025" },
  { title: "Obviously Awesome", author: "April Dunford", year: "2025" },
  { title: "Good Strategy Bad Strategy", author: "Richard Rumelt", year: "2025" },
  { title: "The Psychology of Money", author: "Morgan Housel", year: "2025" },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", year: "2024" },
  { title: "Atomic Habits", author: "James Clear", year: "2024" },
  { title: "Deep Work", author: "Cal Newport", year: "2024" },
  { title: "Digital Minimalism", author: "Cal Newport", year: "2024" },
  { title: "Essentialism", author: "Greg McKeown", year: "2024" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: "2024" },
  { title: "Range", author: "David Epstein", year: "2024" },
  { title: "Outliers", author: "Malcolm Gladwell", year: "2024" },
  { title: "The Tipping Point", author: "Malcolm Gladwell", year: "2024" },
  { title: "Steal Like an Artist", author: "Austin Kleon", year: "2024" },
  { title: "Show Your Work", author: "Austin Kleon", year: "2024" },
  { title: "Things Fall Apart", author: "Chinua Achebe", year: "2024" },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", year: "2024" },
  { title: "Americanah", author: "Chimamanda Ngozi Adichie", year: "2023" },
  { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", year: "2023" },
  { title: "The Alchemist", author: "Paulo Coelho", year: "2023" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", year: "2023" },
  { title: "Mere Christianity", author: "C.S. Lewis", year: "2023" },
  { title: "The Screwtape Letters", author: "C.S. Lewis", year: "2023" },
  { title: "The Ruthless Elimination of Hurry", author: "John Mark Comer", year: "2023" },
];
