"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const heroImages = [
  { id: 0, src: "/images/hero/hero-1.jpg", alt: "2025 robot inside the pit" },
  { id: 1, src: "/images/hero/hero-2.jpg", alt: "Drive team before competition — Bolts & Nuts 2024" },
  { id: 2, src: "/images/hero/hero-3.jpg", alt: "With the robot at FRC 2025" },
  { id: 3, src: "/images/hero/hero-4.jpg", alt: "Bolts & Nuts team with robot — 2025" },
  { id: 4, src: "/images/hero/hero-5.jpg", alt: "Team award photo — Bosphorus Regional 2025" },
  { id: 5, src: "/images/hero/hero-6.jpg", alt: "Working on the robot at competition" },
  { id: 6, src: "/images/hero/hero-7.jpg", alt: "Robot CAD designs — 2024 & 2025 seasons" },
  { id: 7, src: "/images/hero/hero-8.jpg", alt: "Two seasons of robots — River Robotics" },
];

const ITEM_COUNT = heroImages.length;
const AUTO_ROTATE_SPEED = 0.0006;
const MOMENTUM_DECAY = 0.95;

export default function ImageCarousel3D() {
  const [angle, setAngle] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [expandedImg, setExpandedImg] = useState<(typeof heroImages)[number] | null>(null);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const angleStart = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animRef = useRef<number>(0);

  const anglePerItem = (2 * Math.PI) / ITEM_COUNT;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || expandedImg) return;
    const animate = () => {
      if (!isDragging.current) {
        if (Math.abs(velocity.current) > 0.0001) {
          setAngle((prev) => prev + velocity.current);
          velocity.current *= MOMENTUM_DECAY;
        } else {
          setAngle((prev) => prev + AUTO_ROTATE_SPEED);
          velocity.current = 0;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mounted, expandedImg]);

  // Close lightbox on scroll
  useEffect(() => {
    if (!expandedImg) return;
    const handleScroll = () => setExpandedImg(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedImg]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (expandedImg) return;
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.clientX;
      lastX.current = e.clientX;
      angleStart.current = angle;
      velocity.current = 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [angle, expandedImg]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaTotal = e.clientX - dragStartX.current;
    if (Math.abs(deltaTotal) > 5) hasDragged.current = true;
    const deltaFrame = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velocity.current = deltaFrame * 0.0008;
    setAngle(angleStart.current + deltaTotal * 0.003);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleCardClick = useCallback(
    (img: (typeof heroImages)[number], zNorm: number) => {
      if (hasDragged.current) return;
      if (zNorm > 0.85) {
        setExpandedImg(img);
      }
    },
    []
  );

  if (!mounted) {
    return <div className="relative w-full h-[400px] md:h-[500px]" />;
  }

  return (
    <>
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
        <div
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {heroImages.map((img, i) => {
            const itemAngle = angle + i * anglePerItem;
            const cosA = Math.cos(itemAngle);
            const sinA = Math.sin(itemAngle);

            const x = sinA * 280;
            const z = cosA * 200;
            const zNorm = (z + 200) / 400;

            const scale = 0.3 + zNorm * 0.9;
            const cardW = 130 + zNorm * 50;
            const cardH = 170 + zNorm * 60;
            const yOffset = (1 - zNorm) * 20;
            const opacity = 0.15 + zNorm * 0.85;
            const isFront = zNorm > 0.92;

            return (
              <div
                key={img.id}
                className="absolute"
                style={{
                  transform: `translateX(${x}px) translateY(${yOffset}px) scale(${scale})`,
                  zIndex: Math.round(zNorm * 100),
                  opacity,
                  filter: isFront ? "none" : `brightness(${0.25 + zNorm * 0.5})`,
                }}
                onClick={() => handleCardClick(img, zNorm)}
              >
                <div
                  className={`rounded-xl border overflow-hidden transition-colors duration-500 ${
                    isFront
                      ? "border-cyan/50 shadow-[0_0_40px_rgba(0,240,255,0.15)] cursor-pointer"
                      : "border-white/8"
                  }`}
                  style={{ width: cardW, height: cardH }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={200}
                    height={260}
                    className="w-full h-full object-cover pointer-events-none"
                    sizes="200px"
                    priority={i < 3}
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded image lightbox - high z-index to cover everything */}
      <AnimatePresence>
        {expandedImg && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setExpandedImg(null)}
            />
            <motion.div
              className="relative z-10 max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-cyan/30 shadow-[0_0_60px_rgba(0,240,255,0.15)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={expandedImg.src}
                alt={expandedImg.alt}
                width={1600}
                height={1200}
                className="w-full h-auto object-contain max-h-[85vh]"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-foreground/80 text-sm font-mono">
                  {expandedImg.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
