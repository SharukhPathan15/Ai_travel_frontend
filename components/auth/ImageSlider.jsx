"use client";
import { useState, useEffect } from "react";

const IMAGES = [
  { src: "/auth1.jpg", caption: "Goa, India" },
  { src: "/auth2.jpg", caption: "Varanasi, India" },
  { src: "/auth3.jpg", caption: "Istanbul, Turkey" },
  { src: "/auth4.jpg", caption: "Iceland" },
  { src: "/auth5.jpg", caption: "Kashmir, India" },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % IMAGES.length);
        setFading(false);
      }, 600);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:flex md:flex-1 relative overflow-hidden h-full">
      {/* Image - Full height */}
      <img
        src={IMAGES[current].src}
        alt={IMAGES[current].caption}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Bottom text */}
      <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
        <p
          className="text-4xl md:text-5xl font-light text-white leading-tight mb-3 drop-shadow-lg"
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
        >
          Your next adventure
          <br />
          starts here.
        </p>
        <p
          className="text-sm md:text-base text-white/65 font-outfit tracking-wide"
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
        >
          {IMAGES[current].caption}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-10 flex gap-2 pointer-events-auto">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full border-none cursor-pointer h-1.5 ${
              i === current
                ? "w-5 bg-white shadow-lg"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
