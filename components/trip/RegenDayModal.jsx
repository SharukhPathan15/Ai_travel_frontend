"use client";
import { useState } from "react";
import { Loader2, RotateCcw, Sun, Moon, X } from "lucide-react";

export default function RegenDayModal({ day, onClose, onApply }) {
  const [pref, setPref] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setPreview([
      { title: `${pref ? pref + ": " : ""}Morning exploration at local market`, time: "Morning" },
      { title: "Afternoon visit to iconic landmark",                             time: "Afternoon" },
      { title: "Evening dinner at highly-rated local restaurant",                time: "Evening" },
    ]);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">Regenerate Day {day}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Optional preference</label>
          <input
            value={pref}
            onChange={(e) => setPref(e.target.value)}
            placeholder="e.g. more outdoor activities, focus on food..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-6"
          />

          {preview && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
              <div className="space-y-3">
                {preview.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    {a.time === "Evening"
                      ? <Moon className="h-5 w-5 text-indigo-600 mt-0.5" />
                      : <Sun  className={`h-5 w-5 mt-0.5 ${a.time === "Morning" ? "text-amber-500" : "text-orange-500"}`} />
                    }
                    <span>{a.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition">
              Cancel
            </button>
            {!preview ? (
              <button onClick={generate} disabled={loading} className="flex-1 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Generating...</> : <><RotateCcw className="h-5 w-5" /> Generate</>}
              </button>
            ) : (
              <button onClick={() => onApply(preview)} className="flex-1 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition">
                Apply Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}