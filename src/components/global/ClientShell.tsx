"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Navbar = dynamic(() => import("@/components/global/Navbar"), {
  ssr: false,
});
const ParticleBackground = dynamic(
  () => import("@/components/global/ParticleBackground"),
  { ssr: false }
);

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
