import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-6xl lg:text-7xl font-light text-[var(--text-primary)] mb-6 leading-tight display">
          Ready to explore?
        </h2>
        <p className="text-xl lg:text-2xl text-[var(--text-secondary)] mb-10 font-light font-outfit max-w-lg mx-auto leading-relaxed">
          Free to use. No credit card. Your AI travel companion awaits.
        </p>
        <Link
          href="/register"
          className="btn-primary inline-flex items-center justify-center gap-3 text-lg font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all group"
        >
          <span>Create My First Trip</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}
