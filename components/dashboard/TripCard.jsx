import Link from "next/link";
import {
  Trash2,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import CountUp from "@/components/ui/CountUp";

const BUDGET_BADGE = {
  Low: {
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <IndianRupee className="w-3.5 h-3.5" />,
  },
  Medium: {
    cls: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <IndianRupee className="w-3.5 h-3.5" />,
  },
  High: {
    cls: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <IndianRupee className="w-3.5 h-3.5" />,
  },
};

export default function TripCard({ trip, onDelete }) {
  const budget = BUDGET_BADGE[trip.budgetType] || BUDGET_BADGE.Medium;
  const hasItinerary = trip.itinerary?.length > 0;
  const createdDate = new Date(trip.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col h-full">
      {/* Top row: Destination + Budget badge */}
      <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-2">
        <h3 className="text-2xl font-medium text-gray-900 line-clamp-2 leading-tight">
          {trip.destination}
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${budget.cls} flex-shrink-0`}
        >
          {budget.icon}
          {trip.budgetType}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-5 px-6 text-xs text-gray-500 font-medium pb-4">
        <span>{createdDate}</span>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4 text-gray-400" />
          <span>
            {trip.days} {trip.days === 1 ? "day" : "days"}
          </span>
        </div>
      </div>

      {/* Interests */}
      {trip.interests?.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pb-4">
          {trip.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
            >
              {interest}
            </span>
          ))}
          {trip.interests.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
              +{trip.interests.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Itinerary Status */}
      <div
        className={`mx-6 mb-4 px-4 py-2.5 rounded-lg border flex items-center gap-2.5 text-sm font-medium ${
          hasItinerary
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-gray-50 border-gray-200 text-gray-500"
        }`}
      >
        {hasItinerary ? (
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
        )}
        <span>
          {hasItinerary
            ? `Itinerary ready · ${trip.itinerary.length} days`
            : "AI itinerary not generated yet"}
        </span>
      </div>

      {/* Budget Estimate */}
      {trip.budgetEstimate?.total && (
        <div className="mx-6 mb-5 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            Estimated total
          </span>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-5 h-5 text-gray-900" strokeWidth={2.2} />
            <span className="text-xl font-semibold text-gray-900">
              <CountUp value={trip.budgetEstimate.total} />
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto px-6 pb-6 pt-2 flex items-center gap-3">
        <Link
          href={`/trips/${trip._id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[--accent-primary] text-white text-sm font-medium rounded-lg transition-colors"
        >
          {hasItinerary ? "View Trip" : "Generate Plan"}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={() => onDelete(trip._id)}
          className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
          title="Delete trip"
          aria-label="Delete trip"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
