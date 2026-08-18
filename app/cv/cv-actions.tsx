"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <path
        d="M8 2v7.5M4.5 6.5 8 10l3.5-3.5M3 12.5h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <path
        d="M8 10.5V2.5M5 5.5 8 2.5l3 3M3.5 8.5v4a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="cv-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Download CV"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="cv-modal">
        <div className="cv-modal-head">
          <span>Folarin Folarin — Resume.pdf</span>
          <button type="button" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden>
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="cv-modal-preview">
          <div className="cv-modal-page cv-modal-page-back" aria-hidden />
          <div className="cv-modal-page cv-modal-page-front" aria-hidden>
            <span className="cv-modal-avatar" />
            <span className="cv-modal-line cv-modal-line-title" />
            <span className="cv-modal-line cv-modal-line-sub" />
            <span className="cv-modal-line" />
            <span className="cv-modal-line" />
            <span className="cv-modal-line cv-modal-line-short" />
          </div>
        </div>

        <button
          type="button"
          className="cv-modal-download"
          onClick={() => {
            window.print();
            onClose();
          }}
        >
          <DownloadIcon /> Download
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function CVActions() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Folarin Folarin — CV", url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <>
      <button
        type="button"
        className="cv-action"
        aria-label="Download CV"
        onClick={() => setOpen(true)}
      >
        <DownloadIcon />
      </button>
      <button
        type="button"
        className="cv-action"
        aria-label={copied ? "Link copied" : "Share"}
        data-copied={copied || undefined}
        onClick={share}
      >
        <ShareIcon />
      </button>
      {open && <DownloadModal onClose={() => setOpen(false)} />}
    </>
  );
}
