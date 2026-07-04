"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { books, palettes, slugify, type Book } from "./books";

const PAGE_SIZE = 10;
const pageCount = Math.ceil(books.length / PAGE_SIZE);

function BookCard({ book, index }: { book: Book; index: number }) {
  const palette = palettes[index % palettes.length];

  return (
    <Link
      className="book"
      href={`/reading/${slugify(book.title)}`}
      style={
        { animationDelay: `${(index % PAGE_SIZE) * 0.04}s` } as React.CSSProperties
      }
    >
      <div
        className="book-cover"
        style={
          {
            "--cover-bg": palette.bg,
            "--cover-fg": palette.fg,
          } as React.CSSProperties
        }
      >
        {book.coverFront ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.coverFront} alt={`Cover of ${book.title}`} />
        ) : (
          <div className="book-cover-text">
            <span className="book-cover-title">{book.title}</span>
            <span className="book-cover-author">{book.author}</span>
          </div>
        )}
      </div>
      <div className="book-meta">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
      </div>
    </Link>
  );
}

export default function ReadingGrid() {
  const [page, setPage] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const start = page * PAGE_SIZE;
  const visible = books.slice(start, start + PAGE_SIZE);

  return (
    <>
      <div ref={topRef} className="books-anchor" />
      <div key={page} className="books-grid">
        {visible.map((book, i) => (
          <BookCard key={book.title} book={book} index={start + i} />
        ))}
      </div>
      <nav className="pagination" aria-label="Pagination">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          aria-label="Previous page"
        >
          ←
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-current={i === page ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page === pageCount - 1}
          aria-label="Next page"
        >
          →
        </button>
      </nav>
    </>
  );
}
