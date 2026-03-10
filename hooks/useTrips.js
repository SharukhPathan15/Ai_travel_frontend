import { useState, useEffect } from "react";
import { getTrips, deleteTrip } from "@/lib/api";

export default function useTrips(user) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getTrips()
        .then(({ data }) => setTrips(data.data || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const removeTrip = async (id) => {
    await deleteTrip(id);
    setTrips((prev) => prev.filter((t) => t._id !== id));
  };

  const addTrip = (trip) => {
    setTrips((prev) => [trip, ...prev]);
  };

  return { trips, loading, removeTrip, addTrip };
}
