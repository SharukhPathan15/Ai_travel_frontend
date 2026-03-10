"use client";
import { useState } from "react";
import { Plus, RotateCcw, X } from "lucide-react";
import ActivityRow from "./ActivityRow";

export default function DayCard({ dayPlan, onRemove, onAdd, onEdit, onRegen }) {
  const [addMode, setAddMode] = useState(false);
  const [newAct, setNewAct] = useState("");

  const doAdd = () => {
    if (newAct.trim()) {
      onAdd(dayPlan.day, newAct.trim());
      setNewAct("");
      setAddMode(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Day</span>
          <span className="text-2xl font-semibold text-gray-900">{dayPlan.day}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setAddMode(!addMode)} className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Plus className="h-4 w-4 inline mr-1" /> Add
          </button>
          <button onClick={() => onRegen(dayPlan.day)} className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <RotateCcw className="h-4 w-4 inline mr-1" /> Redo
          </button>
        </div>
      </div>

      <div className="p-5">
        {!dayPlan.activities?.length ? (
          <p className="text-center text-gray-500 py-8 text-sm">No activities yet — add one below</p>
        ) : (
          dayPlan.activities.map((a, i) => (
            <ActivityRow
              key={i}
              act={a}
              onRemove={() => onRemove(dayPlan.day, i)}
              onEdit={(title) => onEdit(dayPlan.day, i, title)}
            />
          ))
        )}

        {addMode && (
          <div className="flex items-center gap-2 mt-4">
            <input
              value={newAct}
              onChange={(e) => setNewAct(e.target.value)}
              placeholder="Add new activity..."
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && doAdd()}
            />
            <button onClick={doAdd} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Add</button>
            <button onClick={() => setAddMode(false)} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}