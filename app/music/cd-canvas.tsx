"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const TAU = Math.PI * 2;

// Draws a CD face: iridescent silver disc, circular album-art label,
// silver hub and a real (transparent) center hole.
function makeCdTexture(img: HTMLImageElement | null) {
  const S = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  const c = S / 2;

  // base silver
  const base = ctx.createRadialGradient(c, c, 60, c, c, c);
  base.addColorStop(0, "#ececee");
  base.addColorStop(1, "#c9cbd1");
  ctx.fillStyle = base;
  ctx.beginPath();
  ctx.arc(c, c, c - 6, 0, TAU);
  ctx.fill();

  // prismatic diffraction rainbow — the real CD look
  const rainbow = ctx.createConicGradient(-0.6, c, c);
  const hues = [
    [0.0, 335], [0.08, 20], [0.16, 45], [0.24, 90], [0.34, 160],
    [0.45, 195], [0.55, 225], [0.66, 265], [0.78, 300], [0.9, 325], [1.0, 335],
  ] as const;
  hues.forEach(([stop, h]) =>
    rainbow.addColorStop(stop, `hsl(${h}, 80%, 62%)`)
  );
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = rainbow;
  ctx.beginPath();
  ctx.arc(c, c, c - 6, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;

  // angular white glints where light catches the surface
  const glint = ctx.createConicGradient(0.4, c, c);
  glint.addColorStop(0, "rgba(255,255,255,0)");
  glint.addColorStop(0.06, "rgba(255,255,255,0.85)");
  glint.addColorStop(0.13, "rgba(255,255,255,0)");
  glint.addColorStop(0.52, "rgba(255,255,255,0)");
  glint.addColorStop(0.58, "rgba(255,255,255,0.6)");
  glint.addColorStop(0.66, "rgba(255,255,255,0)");
  glint.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glint;
  ctx.beginPath();
  ctx.arc(c, c, c - 6, 0, TAU);
  ctx.fill();

  // fine radial grooves
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#555";
  for (let r = 170; r < c - 14; r += 7) {
    ctx.beginPath();
    ctx.arc(c, c, r, 0, TAU);
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // album art label
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, 385, 0, TAU);
    ctx.clip();
    ctx.drawImage(img, c - 385, c - 385, 770, 770);
    ctx.restore();
  }

  // hub
  ctx.beginPath();
  ctx.arc(c, c, 148, 0, TAU);
  ctx.fillStyle = "rgba(236, 236, 239, 0.94)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.14)";
  ctx.stroke();

  // center hole (transparent)
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(c, c, 56, 0, TAU);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.beginPath();
  ctx.arc(c, c, 56, 0, TAU);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.18)";
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// disc thickness in scene units — slightly exaggerated so the edge reads
const T = 0.06;
const HOLE_R = 0.22; // matches the transparent hole in the face texture

function Disc({ art, spinning }: { art?: string; spinning: boolean }) {
  const disc = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  // the back of a CD is the plain shiny data side — no album art
  const [backTexture] = useState(() => makeCdTexture(null));

  useEffect(() => {
    let alive = true;
    if (!art) {
      setTexture(makeCdTexture(null));
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => alive && setTexture(makeCdTexture(img));
    img.onerror = () => alive && setTexture(makeCdTexture(null));
    img.src = art;
    return () => {
      alive = false;
    };
  }, [art]);

  useFrame((state, delta) => {
    if (disc.current) {
      disc.current.rotation.z -= (spinning ? 1.6 : 0.12) * delta;
    }
    if (group.current) {
      // gentle parallax toward the pointer
      const tx = -0.42 + state.pointer.y * 0.1;
      const ty = state.pointer.x * 0.16;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.06;
      group.current.rotation.y += (ty - group.current.rotation.y) * 0.06;
    }
  });

  if (!texture) return null;

  const faceProps = {
    transparent: true,
    alphaTest: 0.1,
    roughness: 0.32,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.22,
  };

  return (
    <group ref={group} rotation={[-0.42, 0, 0]}>
      <group ref={disc}>
        {/* label side */}
        <mesh position={[0, 0, T / 2]}>
          <circleGeometry args={[2, 96]} />
          <meshPhysicalMaterial map={texture} {...faceProps} />
        </mesh>
        {/* data side */}
        <mesh position={[0, 0, -T / 2]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[2, 96]} />
          <meshPhysicalMaterial map={backTexture} {...faceProps} />
        </mesh>
        {/* outer rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2, 2, T, 96, 1, true]} />
          <meshPhysicalMaterial
            color="#cdd0d6"
            roughness={0.4}
            metalness={0.55}
            clearcoat={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* center-hole wall */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[HOLE_R, HOLE_R, T, 48, 1, true]} />
          <meshPhysicalMaterial
            color="#e4e5e9"
            roughness={0.5}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function CdCanvas({
  art,
  spinning,
}: {
  art?: string;
  spinning: boolean;
}) {
  return (
    <div className="cd-canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <Disc art={art} spinning={spinning} />
        <Environment resolution={256}>
          <Lightformer
            intensity={1.8}
            position={[0, 5, 4]}
            scale={[14, 4, 1]}
          />
          <Lightformer
            intensity={0.8}
            position={[-6, 0, -2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[8, 3, 1]}
          />
          <Lightformer
            intensity={0.6}
            position={[6, -2, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[8, 3, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
