import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Clock from "../../clock";
import { books, palettes, slugify, bookIndex } from "../books";
import Book3D from "./book3d";
import BackLink from "../../back-link";

export function generateStaticParams() {
  return books.map((book) => ({ slug: slugify(book.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = books[bookIndex(slug)];
  if (!book) return {};
  return {
    title: `${book.title} — Folarin Folarin`,
    description: book.summary,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = bookIndex(slug);
  if (index === -1) notFound();

  const book = books[index];
  const palette = palettes[index % palettes.length];
  const prev = books[index - 1];
  const next = books[index + 1];

  return (
    <div className="homepage">
      <div className="detail-top">
        <BackLink href="/reading" label="Reading" />
        <span className="detail-count">
          {index + 1} / {books.length}
        </span>
      </div>

      <div className="detail-layout">
        <Book3D book={book} bg={palette.bg} fg={palette.fg} />

        <article className="article detail-body">
          <header>
            <h1>{book.title}</h1>
            <time>
              {book.author} · read in {book.year}
            </time>
          </header>
          <p>{book.summary}</p>
          {book.href && (
            <p>
              <a
                className="basic-link"
                target="_blank"
                rel="noopener noreferrer"
                href={book.href}
              >
                Get the book
              </a>
            </p>
          )}
        </article>
      </div>

      <nav className="detail-nav">
        {prev ? (
          <Link href={`/reading/${slugify(prev.title)}`}>
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/reading/${slugify(next.title)}`}>
            {next.title} →
          </Link>
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
