"use client";
import { useState, useEffect } from "react";
import { Compass } from "lucide-react";

export default function GeneratingLoader({ destination }) {
  const steps = [
    `Analyzing ${destination}...`,
    "Building daily plan...",
    "Estimating budget...",
    "Finding hotels...",
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-5 text-center min-h-[60vh]">
      <div className="relative mb-8">
        <Compass className="h-16 w-16 text-indigo-500 animate-spin-slow" />
      </div>
      <h3 className="text-3xl font-medium text-gray-900 mb-3">
        Crafting your itinerary
      </h3>
      <p className="text-gray-600 text-base transition-opacity duration-300">
        {steps[idx]}
      </p>
    </div>
  );
}