import { Plane, MapPin, ArrowRight } from "lucide-react";

export default function EmptyState({ onNew }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-24 px-5 text-center min-h-[60vh]">
      <div className="relative mb-8 sm:mb-10">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center shadow-sm">
          <Plane className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500 stroke-[1.6]" />
        </div>
        <MapPin className="absolute -bottom-2 -right-2 w-8 h-8 text-amber-400 opacity-70" />
      </div>

      <h3 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-4 tracking-tight">
        No trips planned yet
      </h3>

      <p className="text-base sm:text-lg text-gray-600 max-w-md sm:max-w-lg leading-relaxed mb-8">
        Start your next adventure today. Enter a destination and let our AI create
        a complete, personalized itinerary in seconds.
      </p>

      <button
        onClick={onNew}
        className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm sm:text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        <span>Plan My First Trip</span>
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="mt-6 text-sm text-gray-500">
        Popular destinations: Paris, Bali, Tokyo, Goa, New York...
      </p>
    </div>
  );
}
