"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  PresentationControls,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import type { Book } from "../books";

// Book dimensions in scene units
const W = 3.1; // cover width
const H = 4.4; // cover height
const T = 0.09; // cover board thickness
const D = 0.78; // page block depth

// 1x1 transparent png — placeholder url so useTexture's hook call stays
// unconditional even when a book has no cover images
const BLANK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function bodyFont() {
  if (typeof document === "undefined") return "sans-serif";
  return getComputedStyle(document.body).fontFamily || "sans-serif";
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function finishTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeFrontTexture(book: Book, bg: string, fg: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 896;
  const ctx = canvas.getContext("2d")!;
  const font = bodyFont();

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 640, 896);

  ctx.fillStyle = fg;
  ctx.font = `600 52px ${font}`;
  ctx.textBaseline = "top";
  const lines = wrapText(ctx, book.title, 640 - 160);
  lines.forEach((line, i) => ctx.fillText(line, 80, 104 + i * 66));

  ctx.globalAlpha = 0.55;
  ctx.font = `500 24px ${font}`;
  ctx.fillText(book.author.toUpperCase(), 80, 896 - 120);
  ctx.globalAlpha = 1;

  return finishTexture(canvas);
}

function makeBackTexture(book: Book, bg: string, fg: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 896;
  const ctx = canvas.getContext("2d")!;
  const font = bodyFont();

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 640, 896);

  // placeholder blurb lines
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.22;
  const widths = [420, 480, 450, 300, 0, 440, 470, 380];
  widths.forEach((w, i) => {
    if (w > 0) {
      ctx.beginPath();
      ctx.roundRect(80, 120 + i * 40, w, 12, 6);
      ctx.fill();
    }
  });
  ctx.globalAlpha = 0.55;
  ctx.font = `500 22px ${font}`;
  ctx.textBaseline = "top";
  ctx.fillText(book.author.toUpperCase(), 80, 896 - 110);
  ctx.globalAlpha = 1;

  return finishTexture(canvas);
}

function makeSpineTexture(book: Book, bg: string, fg: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 896;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 128, 896);
  // darken the spine slightly, like a cloth wrap
  ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
  ctx.fillRect(0, 0, 128, 896);

  ctx.save();
  ctx.translate(64, 64);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.85;
  ctx.font = `500 30px ${bodyFont()}`;
  ctx.textBaseline = "middle";
  const title =
    book.title.length > 42 ? `${book.title.slice(0, 41)}…` : book.title;
  ctx.fillText(title, 0, 0);
  ctx.restore();

  return finishTexture(canvas);
}

function makePagesTexture(vertical: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f2efe7";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(120, 110, 90, 0.35)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 128; i += 2) {
    ctx.beginPath();
    if (vertical) {
      ctx.moveTo(i * 2, 0);
      ctx.lineTo(i * 2, 256);
    } else {
      ctx.moveTo(0, i * 2);
      ctx.lineTo(256, i * 2);
    }
    ctx.stroke();
  }
  const tex = finishTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Outward -z / -x faces render textures mirrored; flip them back
function mirrored(tex: THREE.Texture) {
  const t = tex.clone();
  t.wrapS = THREE.RepeatWrapping;
  t.center.set(0.5, 0.5);
  t.repeat.x = -1;
  t.needsUpdate = true;
  return t;
}

function BookModel({ book, bg, fg }: { book: Book; bg: string; fg: string }) {
  const [frontImg, backImg] = useTexture([
    book.coverFront ?? BLANK,
    book.coverBack ?? BLANK,
  ]);

  const maps = useMemo(() => {
    if (book.coverFront) frontImg.colorSpace = THREE.SRGBColorSpace;
    if (book.coverBack) backImg.colorSpace = THREE.SRGBColorSpace;
    const front = book.coverFront ? frontImg : makeFrontTexture(book, bg, fg);
    const backSource = book.coverBack
      ? backImg
      : book.coverFront
        ? frontImg
        : makeBackTexture(book, bg, fg);
    return {
      front,
      back: mirrored(backSource),
      spine: mirrored(makeSpineTexture(book, bg, fg)),
      pagesV: makePagesTexture(true),
      pagesH: makePagesTexture(false),
    };
  }, [book, bg, fg, frontImg, backImg]);

  const materials = useMemo(() => {
    const boardProps = {
      roughness: 0.62,
      metalness: 0,
      clearcoat: 0.12,
      clearcoatRoughness: 0.5,
    };
    const edge = new THREE.MeshPhysicalMaterial({ color: bg, ...boardProps });
    const inner = new THREE.MeshPhysicalMaterial({
      color: "#efece3",
      roughness: 0.85,
    });
    const front = new THREE.MeshPhysicalMaterial({
      map: maps.front,
      ...boardProps,
    });
    const back = new THREE.MeshPhysicalMaterial({
      map: maps.back,
      ...boardProps,
    });
    const spine = new THREE.MeshPhysicalMaterial({
      map: maps.spine,
      ...boardProps,
    });
    const spineEdge = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(bg).multiplyScalar(0.86),
      ...boardProps,
    });
    const pagesSide = new THREE.MeshStandardMaterial({
      map: maps.pagesV,
      roughness: 0.95,
    });
    const pagesFlat = new THREE.MeshStandardMaterial({
      map: maps.pagesH,
      roughness: 0.95,
    });
    return { edge, inner, front, back, spine, spineEdge, pagesSide, pagesFlat };
  }, [maps, bg]);

  const coverW = W - T;
  const m = materials;

  return (
    <group>
      {/* front cover — faces ordered +x -x +y -y +z -z */}
      <mesh
        position={[T / 2, 0, D / 2 + T / 2]}
        material={[m.edge, m.edge, m.edge, m.edge, m.front, m.inner]}
      >
        <boxGeometry args={[coverW, H, T]} />
      </mesh>
      {/* back cover */}
      <mesh
        position={[T / 2, 0, -(D / 2 + T / 2)]}
        material={[m.edge, m.edge, m.edge, m.edge, m.inner, m.back]}
      >
        <boxGeometry args={[coverW, H, T]} />
      </mesh>
      {/* spine */}
      <mesh
        position={[-(W / 2) + T / 2, 0, 0]}
        material={[m.inner, m.spine, m.spineEdge, m.spineEdge, m.spineEdge, m.spineEdge]}
      >
        <boxGeometry args={[T, H, D + 2 * T]} />
      </mesh>
      {/* page block */}
      <mesh
        position={[(T - 0.14) / 2, 0, 0]}
        material={[m.pagesSide, m.pagesSide, m.pagesFlat, m.pagesFlat, m.inner, m.inner]}
      >
        <boxGeometry args={[W - T - 0.14, H - 0.16, D]} />
      </mesh>
    </group>
  );
}

export default function BookCanvas({
  book,
  bg,
  fg,
}: {
  book: Book;
  bg: string;
  fg: string;
}) {
  return (
    <div className="book3d-canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 9.4], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 6]} intensity={2.1} />
        <directionalLight position={[-5, 2, -4]} intensity={0.5} />
        <Suspense fallback={null}>
          <PresentationControls
            global
            cursor
            snap={false}
            speed={1.4}
            rotation={[0.07, -0.55, 0]}
            polar={[-0.35, 0.35]}
            azimuth={[-Infinity, Infinity]}
            damping={0.18}
          >
            <BookModel book={book} bg={bg} fg={fg} />
          </PresentationControls>
          <Environment resolution={256}>
            <Lightformer
              intensity={1.6}
              position={[0, 4, 6]}
              scale={[12, 5, 1]}
            />
            <Lightformer
              intensity={0.7}
              position={[-6, 2, -3]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[8, 4, 1]}
            />
            <Lightformer
              intensity={0.5}
              position={[6, -1, 2]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[8, 3, 1]}
            />
          </Environment>
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.38}
            scale={11}
            blur={2.4}
            far={4.4}
            resolution={512}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
