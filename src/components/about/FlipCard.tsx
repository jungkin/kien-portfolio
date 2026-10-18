"use client";

import Image from "next/image";
import type { FlipCardData } from "@/data/about";

interface FlipCardProps {
  card: FlipCardData;
  isFlipped: boolean;
  onClick: () => void;
}

export default function FlipCard({ card, isFlipped, onClick }: FlipCardProps) {
  return (
    <div
      className="perspective-1000 w-full h-[200px] md:h-[250px] cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`preserve-3d relative w-full h-full transition-transform duration-600 ease-in-out ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transitionDuration: "0.6s" }}
      >
        {/* Front face */}
        <div className="backface-hidden absolute inset-0 rounded-xl border border-white/10 overflow-hidden hover:border-cyan/30 transition-colors group">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-foreground text-sm font-bold">{card.title}</p>
          </div>
        </div>

        {/* Back face */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-xl border border-cyan/30 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#0d1b2a] to-[#1b2838]" />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-5 gap-2">
            <h3 className="text-foreground font-bold text-lg">{card.title}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {card.description}
            </p>
            <span className="text-cyan text-xs font-mono mt-1">
              {card.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
