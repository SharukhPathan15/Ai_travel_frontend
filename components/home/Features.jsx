import FeatureCard from "@/components/home/FeatureCard";
import { Brain, Edit, DollarSign, Hotel, Lock, Smartphone } from "lucide-react";

const FEATURES = [
  { icon: Brain, label: "AI-Powered", title: "Instant Itineraries", body: "Groq LLM crafts a personalized day-by-day plan in seconds." },
  { icon: Edit, label: "Editable", title: "Your Trip, Your Rules", body: "Add activities, remove them, edit any detail." },
  { icon: DollarSign, label: "Budget", title: "Real Cost Breakdown", body: "Flights, accommodation, food — itemized estimates." },
  { icon: Hotel, label: "Hotels", title: "Curated Stays", body: "Budget hostels to luxury resorts for your style." },
  { icon: Lock, label: "Private", title: "Your Data Only", body: "Strict data isolation — your trips stay private." },
  { icon: Smartphone, label: "Responsive", title: "Plan Anywhere", body: "Perfect on desktop, tablet, or phone." },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-[var(--bg-base)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-14 flex flex-col gap-2 text-center lg:text-left">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">What you get</span>
          <h2 className="text-5xl font-light leading-tight text-[var(--text-primary)]">
            Everything for the
            <em className="text-[var(--accent-primary)] italic font-serif block">perfect trip</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              label={feature.label}
              title={feature.title}
              body={feature.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
