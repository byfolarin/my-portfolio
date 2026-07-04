"use client";

import { useEffect, useRef } from "react";
import type { Book } from "../books";

const IDLE_SPEED = 0.12; // deg per frame
const FRICTION = 0.94;
const REST_X = -6; // slight downward tilt at rest

export default function Book3D({
  book,
  bg,
  fg,
}: {
  book: Book;
  bg: string;
  fg: string;
}) {
  const bookRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bookRef.current;
    const scene = sceneRef.current;
    if (!el || !scene) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rotY = -30;
    let rotX = REST_X;
    let velY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleTimer = reduceMotion ? Infinity : 0;
    let raf = 0;

    const render = () => {
      el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const tick = () => {
      if (!dragging) {
        if (Math.abs(velY) > 0.05) {
          rotY += velY;
          velY *= FRICTION;
        } else if (idleTimer <= 0) {
          rotY += IDLE_SPEED;
        } else {
          idleTimer -= 1;
        }
        // ease tilt back to rest
        rotX += (REST_X - rotX) * 0.05;
        render();
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = 0;
      scene.setPointerCapture(e.pointerId);
      scene.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.45;
      rotX = Math.max(-28, Math.min(28, rotX - dy * 0.25));
      velY = dx * 0.45;
      render();
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      scene.releasePointerCapture(e.pointerId);
      scene.style.cursor = "grab";
      // pause the idle spin briefly so the book settles where you left it
      idleTimer = reduceMotion ? Infinity : 240;
    };

    scene.addEventListener("pointerdown", onPointerDown);
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerup", onPointerUp);
    scene.addEventListener("pointercancel", onPointerUp);
    render();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      scene.removeEventListener("pointerdown", onPointerDown);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerup", onPointerUp);
      scene.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const vars = { "--cover-bg": bg, "--cover-fg": fg } as React.CSSProperties;

  return (
    <div className="book3d-wrap">
      <div ref={sceneRef} className="book3d-scene" style={vars}>
        <div ref={bookRef} className="book3d">
          <div className="book3d-face book3d-front">
            {book.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.cover} alt={`Cover of ${book.title}`} />
            ) : (
              <>
                <span className="book3d-title">{book.title}</span>
                <span className="book3d-author">{book.author}</span>
              </>
            )}
          </div>
          <div className="book3d-face book3d-back" />
          <div className="book3d-face book3d-spine">
            <span>{book.title}</span>
          </div>
          <div className="book3d-face book3d-pages" />
          <div className="book3d-face book3d-top" />
          <div className="book3d-face book3d-bottom" />
        </div>
        <div className="book3d-shadow" />
      </div>
      <p className="book3d-hint">Drag to spin</p>
    </div>
  );
}
