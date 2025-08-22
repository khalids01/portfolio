"use client";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { ComponentType } from "react";
import type { Group } from "three";
import {
  Code2,
  Boxes,
  Cpu,
  Database,
  Braces,
  Terminal,
  Cloud,
  GitBranch,
  Globe,
  FileCode2,
} from "lucide-react";

export type Skill = { name: string };

// Simple mapping of skill names to placeholder lucide icons
function iconForSkill(name: string): ComponentType<{ className?: string }> {
  const key = name.toLowerCase();
  if (/(js|javascript|ts|typescript|node)/.test(key)) return FileCode2;
  if (/(react|next)/.test(key)) return Boxes;
  if (/(css|tailwind|ui)/.test(key)) return Braces;
  if (/(db|sql|prisma|mongo|postgres)/.test(key)) return Database;
  if (/(cloud|aws|gcp|azure|vercel)/.test(key)) return Cloud;
  if (/(api|backend|server)/.test(key)) return Terminal;
  if (/(git|github|gitlab)/.test(key)) return GitBranch;
  if (/(web|three|threejs|r3f)/.test(key)) return Globe;
  if (/(rust|go|java|python)/.test(key)) return Cpu;
  return Code2;
}

function SphereIcons({ skills }: { skills: Skill[] }) {
  const group = React.useRef<Group | null>(null);
  useFrame((_state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  // Position N icons roughly uniformly using spherical coordinates
  const N = Math.max(8, Math.min(24, skills.length || 12));
  const items = Array.from({ length: N }, (_, i) => {
    const phi = Math.acos(1 - 2 * ((i + 0.5) / N));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i; // golden angle
    const r = 1.6;
    const x = r * Math.cos(theta) * Math.sin(phi);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(theta) * Math.sin(phi);
    const Icon = iconForSkill(skills[i % skills.length]?.name || "");
    return { x, y, z, Icon, key: i };
  });

  return (
    <group ref={group}>
      {/* base sphere for subtle presence */}
      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial color="#ffffff" opacity={0} transparent />
      </mesh>
      {items.map(({ x, y, z, Icon, key }) => (
        <Html key={key} position={[x, y, z]} transform distanceFactor={6} occlude>
          <div className="grid place-items-center rounded-md bg-background/70 p-1.5 shadow-sm ring-1 ring-border backdrop-blur">
            <Icon className="size-5" />
          </div>
        </Html>
      ))}
    </group>
  );
}

export function SkillSphere({ skills }: { skills: Skill[] }) {
  return (
    <div className="h-64 w-full md:h-80 lg:h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <SphereIcons skills={skills} />
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.1} />
      </Canvas>
    </div>
  );
}
