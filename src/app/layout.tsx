import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/global/ClientShell";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kien Nguyen — Mechanical Design & Robotics",
  description:
    "Portfolio of Kien Nguyen, mechanical engineering student at the University of South Florida designing actuators, mechanisms and legged robots. Seeking Summer 2027 robotics internships.",
  authors: [{ name: "Le Trung Kien Nguyen" }],
  keywords: [
    "Kien Nguyen",
    "mechanical engineering",
    "robotics",
    "actuators",
    "SolidWorks",
    "humanoid robots",
    "USF",
    "internship",
  ],
  openGraph: {
    title: "Kien Nguyen — Mechanical Design & Robotics",
    description:
      "Actuators, mechanisms and legged robots — from first-principles torque math to the assembled prototype.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink paper-grid">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
