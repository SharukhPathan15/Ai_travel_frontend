"use client";
import { useState } from "react";
import { Sun, Moon, MapPin, Pencil, Trash2, Check, X } from "lucide-react";

export default function ActivityRow({ act, onRemove, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(act.title);

  const timeIcons = {
    Morning: <Sun className="h-5 w-5 text-amber-500" />,
    Afternoon: <Sun className="h-5 w-5 text-orange-500" />,
    Evening: <Moon className="h-5 w-5 text-indigo-600" />,
  };

  const save = () => {
    if (val.trim()) {
      onEdit(val.trim());
      setEditing(false);
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0 group">
      <div className="mt-1 flex-shrink-0">
        {timeIcons[act.time] || <MapPin className="h-5 w-5 text-gray-400" />}
      </div>
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              onKeyDown={(e) => e.key === "Enter" && save()}
              autoFocus
            />
            <button onClick={save} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <Check className="h-4 w-4" />
            </button>
            <button onClick={() => setEditing(false)} className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-900 font-medium flex-1">{act.title}</span>
            {act.time && <span className="text-xs text-gray-500 whitespace-nowrap">{act.time}</span>}
          </div>
        )}
      </div>
      {!editing && (
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={onRemove} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}