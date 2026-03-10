'use client';
import { useState } from 'react';
import {
  MapPin, CalendarDays, Wallet, Utensils, Landmark, Mountain,
  ShoppingBag, Leaf, Moon, Palette, Sun, Building2, Dumbbell,
  PlaneTakeoff, ArrowRight, ArrowLeft, X, Loader2,
} from 'lucide-react';
import { createTrip } from '@/lib/api';

const INTERESTS = [
  { name: 'Food & Dining',     icon: <Utensils className="w-4 h-4" /> },
  { name: 'Culture & History', icon: <Landmark className="w-4 h-4" /> },
  { name: 'Adventure',         icon: <Mountain className="w-4 h-4" /> },
  { name: 'Shopping',          icon: <ShoppingBag className="w-4 h-4" /> },
  { name: 'Nature',            icon: <Leaf className="w-4 h-4" /> },
  { name: 'Nightlife',         icon: <Moon className="w-4 h-4" /> },
  { name: 'Art & Museums',     icon: <Palette className="w-4 h-4" /> },
  { name: 'Beaches',           icon: <Sun className="w-4 h-4" /> },
  { name: 'Architecture',      icon: <Building2 className="w-4 h-4" /> },
  { name: 'Sports',            icon: <Dumbbell className="w-4 h-4" /> },
];

const BUDGETS = [
  { value: 'Low',    label: 'Budget',   desc: 'Hostels · street food · free sights',  icon: <Wallet className="w-5 h-5 text-emerald-600" />, color: 'emerald' },
  { value: 'Medium', label: 'Mid-range', desc: '3★ hotels · local restaurants',        icon: <Wallet className="w-5 h-5 text-blue-600" />,    color: 'blue' },
  { value: 'High',   label: 'Luxury',   desc: '5★ hotels · fine dining · VIP',        icon: <Wallet className="w-5 h-5 text-amber-600" />,   color: 'amber' },
];

export default function NewTripModal({ onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ destination: '', days: '', budgetType: '', interests: [] });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const goNext = () => {
    if (!form.destination.trim() || !form.days || !form.budgetType) {
      setError('Please fill in destination, days, and budget.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!form.interests.length) {
      setError('Please select at least one interest.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const payload = { ...form, days: Number(form.days) };
      const { data } = await createTrip(payload);
      onCreated(data.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create trip. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex items-start justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {step === 1 ? 'Plan Your Trip' : 'What interests you?'}
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">Step {step} of 2</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-6">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[--accent-primary] transition-all duration-500 ease-out"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        <div className="px-6 pb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-3">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          {/* Step 1: Basics */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Destination
                </label>
                <input
                  value={form.destination}
                  onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
                  placeholder="e.g. Kyoto, Japan or Goa, India"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--accent-subtle] focus:border-[--accent-subtle] outline-none transition"
                  autoFocus
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  Number of days
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={form.days}
                  onChange={(e) => setForm((p) => ({ ...p, days: e.target.value }))}
                  placeholder="e.g. 7"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--accent-subtle] focus:border-[--accent-subtle] outline-none transition"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gray-500" />
                  Budget preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {BUDGETS.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, budgetType: b.value }))}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        form.budgetType === b.value
                          ? `border-${b.color}-500 bg-${b.color}-50 ring-2 ring-${b.color}-200`
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-white'
                      }`}
                    >
                      <div className="mb-2">{b.icon}</div>
                      <div className="font-medium text-gray-900">{b.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={goNext}
                className="w-full py-3.5 px-6 bg-[--accent-primary] text-white font-medium rounded-xl transition flex items-center justify-center gap-2 shadow-sm hover:shadow group"
                disabled={submitting}
              >
                Next: Interests
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">
                  Select your interests
                  {form.interests.length > 0 && (
                    <span className="ml-2 text-[--accent-primary] font-medium">
                      ({form.interests.length} selected)
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS.map(({ name, icon }) => {
                    const isActive = form.interests.includes(name);
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleInterest(name)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-[--accent-primary] text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {icon}
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 px-6 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || form.interests.length === 0}
                  className="flex-1 py-3.5 px-6 bg-[--accent-primary] text-white font-medium rounded-xl transition flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating trip...
                    </>
                  ) : (
                    <>
                      Create Trip
                      <PlaneTakeoff className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
