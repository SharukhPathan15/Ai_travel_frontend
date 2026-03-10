'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const DESTS = ["Tokyo", "Paris", "Bali", "New York", "Rome", "Kyoto", "Istanbul", "Sydney"];

export default function Hero() {
  const [destIndex, setDestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDestIndex((prev) => (prev + 1) % DESTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="topo-lines relative pt-[140px] pb-[100px] bg-cover bg-center border-b border-[var(--border-subtle)]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/Herosection.jpg')",
      }}
    >
      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        <div className="anim-fade-up mb-5">
          <span className="block text-xs uppercase tracking-wider text-white font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            AI Travel Planner
          </span>
        </div>

        <h1 className="anim-fade-up text-[clamp(52px,8vw,96px)] leading-[1] font-light text-white mb-6 tracking-[-0.02em]">
          Plan your
          <br />
          <em className="text-[var(--accent-primary)] italic">next adventure</em>
          <br />
          in seconds.
        </h1>

        <p className="anim-fade-up text-lg leading-[1.7] text-white max-w-xl mb-10 font-light font-outfit">
          Tell us your destination, budget, and interests. Our AI builds a
          complete day-by-day itinerary with budget estimates and hotel
          suggestions — instantly.
        </p>

        <div className="anim-fade-up flex flex-wrap gap-3">
          <Link
            href="/register"
            className="btn-primary inline-flex items-center justify-center gap-2 text-[15px] font-medium px-7 py-[13px] rounded-lg transition-all group"
          >
            <span>Start Planning Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/login"
            className="btn-ghost inline-flex items-center text-white border-white justify-center text-[15px] font-medium px-7 py-[13px] rounded-lg transition-all"
          >
            Sign In
          </Link>
        </div>

        <div className="anim-fade-up mt-12 flex flex-wrap gap-2">
          {DESTS.map((d) => (
            <span
              key={d}
              className="badge badge-neutral inline-flex px-[14px] py-1.5 text-xs rounded-full hover:bg-[var(--accent-subtle)] transition-colors cursor-pointer"
            >
              {d}
            </span>
          ))}
          <span className="badge badge-neutral inline-flex px-[14px] py-1.5 text-xs rounded-full">
            + anywhere
          </span>
        </div>
      </div>
    </section>
  );
}
