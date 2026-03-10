import { Map, CalendarCheck, MapPin, ArrowUpRight } from "lucide-react";
import CountUp from "@/components/ui/CountUp";

export default function DashboardHeader({ userName, trips, onNewTrip }) {
  const planned = trips.filter((t) => t.itinerary?.length > 0).length;
  const destinations = [...new Set(trips.map((t) => t.destination))].length;

  const stats = [
    {
      val: trips.length,
      label: "Total trips",
      icon: (
        <Map
          className="w-7 h-7 text-indigo-600 dark:text-indigo-400"
          strokeWidth={1.8}
        />
      ),
      color: "indigo",
    },
    {
      val: planned,
      label: "With itinerary",
      icon: (
        <CalendarCheck
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          strokeWidth={1.8}
        />
      ),
      color: "emerald",
    },
    {
      val: destinations,
      label: "Destinations",
      icon: (
        <MapPin
          className="w-7 h-7 text-amber-600 dark:text-amber-400"
          strokeWidth={1.8}
        />
      ),
      color: "amber",
    },
  ];

  return (
    <div
      className="
        relative bg-[url('/dashhero.jpg')] bg-cover bg-center bg-no-repeat 
        border-b border-[var(--border-subtle)] pt-20 pb-12 md:pb-16
        overflow-hidden
      "
    >
      {/* Optional subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Stats row – improved layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mt-16 md:mt-20">
          {stats.map(({ val, label, icon, color }) => (
            <div
              key={label}
              className={`
                group relative bg-[var(--bg-surface)] border border-[var(--border-subtle)] 
                rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 
                transition-all duration-300 overflow-hidden
              `}
            >
              {/* Subtle gradient accent bar at top */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${color}-500 to-${color}-600/70`}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-none mb-2">
                    <CountUp value={val} />
                  </div>
                  <div className="text-sm md:text-base text-[var(--text-tertiary)] font-medium">
                    {label}
                  </div>
                </div>

                {/* Icon container */}
                <div
                  className={`
                  p-3 rounded-xl bg-${color}-50/70 dark:bg-${color}-950/40 
                  border border-${color}-200/50 dark:border-${color}-800/40 
                  text-${color}-600 dark:text-${color}-400
                  transition-transform group-hover:scale-110 duration-300
                `}
                >
                  {icon}
                </div>
              </div>

              {/* Optional subtle arrow / growth indicator */}
              {val > 0 && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className={`w-5 h-5 text-${color}-600/70`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
