"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTrips, deleteTrip } from "@/lib/api";
import { Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import TripCard from "@/components/dashboard/TripCard";
import NewTripModal from "@/components/dashboard/NewTripModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SkeletonCard from "@/components/dashboard/SkeletonCard";
import EmptyState from "@/components/dashboard/EmptyState";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getTrips()
        .then(({ data }) => setTrips(data.data || []))
        .catch(() => {})
        .finally(() => setTripsLoading(false));
    }
  }, [user]);

  const handleCreated = (trip) => {
    setTrips((p) => [trip, ...p]);
    setShowModal(false);
    router.push(`/trips/${trip._id}`);
  };

  const handleDelete = (id) => setDeleteTarget(id);

  const confirmDelete = async () => {
    try {
      await deleteTrip(deleteTarget);
      setTrips((p) => p.filter((t) => t._id !== deleteTarget));
    } catch {}
    setDeleteTarget(null);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />

      <DashboardHeader
        userName={user?.name?.split(" ")[0]}
        trips={trips}
        onNewTrip={() => setShowModal(true)}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-9">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          {/* Title Section */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              {user?.name?.split(" ")[0]}'s Expeditions
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-tertiary)]">
              Plan, organize, and explore your upcoming journeys.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowModal(true)}
            className="
      group inline-flex items-center gap-2
      bg-[var(--primary)] text-[var(--text-primary)]
      border border-[var(--border-subtle)]
      px-4 py-2.5 rounded-xl
      text-sm font-medium
      shadow-sm hover:shadow-md
      hover:brightness-110
      transition-all duration-200
      whitespace-nowrap
    "
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>New Trip</span>
          </button>
        </div>

        <ConfirmModal
          show={!!deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          title="Delete this trip?"
          description="This will permanently remove the trip and its itinerary. This cannot be undone."
          confirmLabel="Delete Trip"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tripsLoading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : trips.length === 0 ? (
            <EmptyState onNew={() => setShowModal(true)} />
          ) : (
            trips.map((trip, i) => (
              <div
                key={trip._id}
                className="anim-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <TripCard trip={trip} onDelete={handleDelete} />
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <NewTripModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
