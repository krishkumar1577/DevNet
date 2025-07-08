"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextExplosionProps {
  text: string;
  className?: string;
}

export default function TextExplosion({ text, className = "" }: TextExplosionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');
    
    // Initial state - letters scattered
    gsap.set(letters, {
      x: () => (Math.random() - 0.5) * 400,
      y: () => (Math.random() - 0.5) * 400,
      rotation: () => Math.random() * 360,
      scale: 0,
      opacity: 0
    });

    // Animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });
    
    tl.to(letters, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "back.out(1.7)",
      stagger: 0.1
    })
    .to(letters, {
      x: () => (Math.random() - 0.5) * 200,
      y: () => (Math.random() - 0.5) * 200,
      rotation: () => Math.random() * 180,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.05
    }, "+=1");

  }, []);

  const letters = text.split('').map((letter, i) => (
    <span key={i} className="letter inline-block">{letter === ' ' ? '\u00A0' : letter}</span>
  ));

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="text-6xl md:text-8xl font-bold">
        {letters}
      </div>
    </div>
  );
}