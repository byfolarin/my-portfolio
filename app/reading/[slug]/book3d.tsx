"use client";

import dynamic from "next/dynamic";
import type { Book } from "../books";

// WebGL only renders client-side; load the three.js chunk lazily so the
// rest of the site stays light
const BookCanvas = dynamic(() => import("./book-canvas"), {
  ssr: false,
  loading: () => <div className="book3d-canvas" aria-hidden />,
});

export default function Book3D({
  book,
  bg,
  fg,
}: {
  book: Book;
  bg: string;
  fg: string;
}) {
  return (
    <div className="book3d-wrap">
      <BookCanvas book={book} bg={bg} fg={fg} />
      <p className="book3d-hint">Drag to spin</p>
    </div>
  );
}
