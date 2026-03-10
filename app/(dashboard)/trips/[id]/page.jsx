"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getTrip, generateAITrip } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import GeneratingLoader from "@/components/trip/GeneratingLoader";
import DayCard         from "@/components/trip/DayCard";
import BudgetCard      from "@/components/trip/BudgetCard";
import HotelCard       from "@/components/trip/HotelCard";
import RegenDayModal   from "@/components/trip/RegenDayModal";
import {
  Loader2, AlertCircle, ArrowLeft, IndianRupee,
  CalendarDays, Hotel, PlaneTakeoff, RotateCcw, X,
} from "lucide-react";


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TripDetail() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("itinerary");
  const [regenDay, setRegenDay] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (id && user) {
      getTrip(id)
        .then(({ data }) => setTrip(data.data))
        .catch(() => setError("Trip not found."))
        .finally(() => setFetching(false));
    }
  }, [id, user]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    try {
      const { data } = await generateAITrip(id);
      setTrip(data.data);
      setTab("itinerary");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Generation failed. Please try again.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const mutateItinerary = useCallback((updater) => {
    setTrip((prev) => ({ ...prev, itinerary: updater(prev.itinerary) }));
  }, []);

  const removeAct = (day, idx) =>
    mutateItinerary((itin) =>
      itin.map((d) =>
        d.day === day
          ? { ...d, activities: d.activities.filter((_, i) => i !== idx) }
          : d,
      ),
    );

  const addAct = (day, title) =>
    mutateItinerary((itin) =>
      itin.map((d) =>
        d.day === day
          ? {
              ...d,
              activities: [...d.activities, { title, time: "Afternoon" }],
            }
          : d,
      ),
    );

  const editAct = (day, idx, title) =>
    mutateItinerary((itin) =>
      itin.map((d) =>
        d.day === day
          ? {
              ...d,
              activities: d.activities.map((a, i) =>
                i === idx ? { ...a, title } : a,
              ),
            }
          : d,
      ),
    );

  const regenApply = (day, newActs) => {
    mutateItinerary((itin) =>
      itin.map((d) => (d.day === day ? { ...d, activities: newActs } : d)),
    );
    setRegenDay(null);
  };

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navbar />
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error && !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6">
        <Navbar />
        <AlertCircle className="h-16 w-16 text-red-500" />
        <h2 className="text-3xl font-semibold text-gray-900">{error}</h2>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const hasItinerary = trip?.itinerary?.length > 0;

  const tabs = [
    {
      id: "itinerary",
      label: "Itinerary",
      icon: <CalendarDays className="h-4 w-4" />,
      show: true,
    },
    {
      id: "budget",
      label: "Budget",
      icon: <IndianRupee className="h-4 w-4" />,
      show: !!trip?.budgetEstimate?.total,
    },
    {
      id: "hotels",
      label: "Hotels",
      icon: <Hotel className="h-4 w-4" />,
      show: !!trip?.hotels?.length,
    },
  ].filter((t) => t.show);

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />

      {/* Trip Header */}
      <div
        className="border-b border-gray-200 pt-20 relative"
        style={{
          backgroundImage: "url(/dashhero1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-[--accent-primary] transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Trips
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
                {trip?.destination}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  <CalendarDays className="h-4 w-4" />
                  {trip?.days} {trip?.days === 1 ? "day" : "days"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  <IndianRupee className="h-4 w-4" />
                  {trip?.budgetType}
                </span>
                {trip?.interests?.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {hasItinerary && !generating && (
                <button
                  onClick={handleGenerate}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Regenerate All
                </button>
              )}
              {!hasItinerary && !generating && (
                <button
                  onClick={handleGenerate}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm"
                >
                  <PlaneTakeoff className="h-5 w-5" />
                  Generate Itinerary
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          {hasItinerary && (
            <div className="flex border-b border-gray-200 -mb-px">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                    ${
                      tab === t.id
                        ? "border-[--accent-primary] text-[--accent-primary]"
                        : "border-transparent text-gray-100 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              className="text-red-700 hover:text-red-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {generating ? (
          <GeneratingLoader destination={trip?.destination} />
        ) : !hasItinerary ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <PlaneTakeoff className="h-20 w-20 text-indigo-500 mb-8" />
            <h3 className="text-4xl font-semibold text-gray-900 mb-4">
              Ready to plan your trip
            </h3>
            <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
              Our AI will create a complete day-by-day itinerary for{" "}
              <span className="font-semibold text-gray-900">
                {trip?.destination}
              </span>{" "}
              including budget estimates and hotel recommendations.
            </p>
            <button
              onClick={handleGenerate}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center gap-3"
            >
              <PlaneTakeoff className="h-6 w-6" />
              Generate My Itinerary
            </button>
          </div>
        ) : (
          <>
            {tab === "itinerary" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trip.itinerary.map((day, i) => (
                  <div
                    key={day.day}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <DayCard
                      dayPlan={day}
                      onRemove={removeAct}
                      onAdd={addAct}
                      onEdit={editAct}
                      onRegen={setRegenDay}
                    />
                  </div>
                ))}
              </div>
            )}

            {tab === "budget" && trip.budgetEstimate && (
              <div className="animate-fade-in">
                <BudgetCard budget={trip.budgetEstimate} />
              </div>
            )}

            {tab === "hotels" && trip.hotels?.length > 0 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Recommended Hotels in {trip.destination}
                </h2>
                <div className="space-y-4 max-w-2xl">
                  {trip.hotels.map((hotel, i) => (
                    <div
                      key={i}
                      className="animate-fade-up"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <HotelCard hotel={hotel} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {regenDay !== null && (
        <RegenDayModal
          day={regenDay}
          onClose={() => setRegenDay(null)}
          onApply={(acts) => regenApply(regenDay, acts)}
        />
      )}
    </div>
  );
}
