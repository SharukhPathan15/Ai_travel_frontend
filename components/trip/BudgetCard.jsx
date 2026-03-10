import { Map , Hotel, Utensils, MapPin, IndianRupee } from "lucide-react";

export default function BudgetCard({ budget }) {
  const items = [
    { label: "Travels",       val: budget.flights,       icon: <Map  className="h-5 w-5 text-indigo-500" /> },
    { label: "Accommodation", val: budget.accommodation, icon: <Hotel        className="h-5 w-5 text-indigo-500" /> },
    { label: "Food",          val: budget.food,          icon: <Utensils     className="h-5 w-5 text-indigo-500" /> },
    { label: "Activities",    val: budget.activities,    icon: <MapPin       className="h-5 w-5 text-indigo-500" /> },
  ];

  const total = budget.total || items.reduce((sum, i) => sum + (i.val || 0), 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-2xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Total Cost</h3>
        <div className="text-4xl font-bold text-gray-900">
          <IndianRupee className="h-8 w-8 inline mr-1 -mt-1" />
          {total.toLocaleString("en-IN")}
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map(({ label, val, icon }) => (
          <div key={label} className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3 text-gray-700">
              {icon}
              <span className="font-medium">{label}</span>
            </div>
            <span className="font-mono font-medium text-gray-900">
              {val ? <><IndianRupee className="h-4 w-4 inline mr-1" />{val.toLocaleString("en-IN")}</> : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}