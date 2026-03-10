import { Hotel } from "lucide-react";

const TYPE_STYLES = {
  "Budget":          "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Budget Friendly": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Mid-range":       "bg-blue-100 text-blue-800 border-blue-200",
  "Mid Range":       "bg-blue-100 text-blue-800 border-blue-200",
  "Luxury":          "bg-amber-100 text-amber-800 border-amber-200",
};

export default function HotelCard({ hotel }) {
  const badgeClass = TYPE_STYLES[hotel.type] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
        <Hotel className="h-6 w-6 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">{hotel.name}</div>
        {hotel.rating && (
          <div className="text-sm text-gray-600 mt-1">
            {"★".repeat(Math.round(hotel.rating))} {hotel.rating}/5
          </div>
        )}
      </div>
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${badgeClass}`}>
        {hotel.type}
      </span>
    </div>
  );
}