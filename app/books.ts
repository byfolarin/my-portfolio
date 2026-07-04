// Edit this file to manage the books grid.
// Add a cover image by dropping a file in /public/books and setting `cover`,
// e.g. cover: "/books/my-book.jpg" — otherwise a typographic cover is
// generated from the title using `bg` and `fg`.

export type Book = {
  title: string;
  year: string;
  href?: string;
  cover?: string;
  bg: string;
  fg: string;
};

export const books: Book[] = [
  { title: "Book One", year: "2026", bg: "#1a1a1a", fg: "#f5f4ef" },
  { title: "Book Two", year: "2026", bg: "#e9e5db", fg: "#1a1a1a" },
  { title: "Book Three", year: "2025", bg: "#12372a", fg: "#efece2" },
  { title: "Book Four", year: "2025", bg: "#dde3ea", fg: "#16283a" },
  { title: "Book Five", year: "2025", bg: "#5b3a2e", fg: "#f2e9df" },
  { title: "Book Six", year: "2024", bg: "#f0ece4", fg: "#3b3226" },
  { title: "Book Seven", year: "2024", bg: "#2b3040", fg: "#e8eaf0" },
  { title: "Book Eight", year: "2023", bg: "#c7cfc4", fg: "#22301f" },
];
