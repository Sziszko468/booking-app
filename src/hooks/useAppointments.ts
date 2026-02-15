import { useState, useEffect, useCallback } from "react";
import { Appointment } from "@/types/appointment";
import * as appointmentService from "@/services/appointmentApi";

type UseAppointmentsReturn = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  createAppointment: (data: Omit<Appointment, "id">) => Promise<{ success: boolean; data?: Appointment; error?: string }>;
  updateAppointment: (id: string, data: Partial<Omit<Appointment, "id">>) => Promise<{ success: boolean; data?: Appointment; error?: string }>;
  deleteAppointment: (id: string) => Promise<{ success: boolean; error?: string }>;
  getAppointmentById: (id: string) => Appointment | null;
  refresh: () => void;
};

export const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load appointments
  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError("Failed to load appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  // Create appointment
  const createAppointment = useCallback(async (data: Omit<Appointment, "id">): Promise<{ success: boolean; data?: Appointment; error?: string }> => {
    try {
      const newAppointment = await appointmentService.createAppointment(data);
      setAppointments(prev => [...prev, newAppointment]);
      return { success: true, data: newAppointment };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Failed to create appointment" };
    }
  }, []);

  // Update appointment
  const updateAppointment = useCallback(async (id: string, data: Partial<Omit<Appointment, "id">>): Promise<{ success: boolean; data?: Appointment; error?: string }> => {
    try {
      const updated = await appointmentService.updateAppointment(id, data);
      if (updated) {
        setAppointments(prev => prev.map(a => a.id === id ? updated : a));
        return { success: true, data: updated };
      }
      return { success: false, error: "Appointment not found" };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Failed to update appointment" };
    }
  }, []);

  // Delete appointment
  const deleteAppointment = useCallback(async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const success = await appointmentService.deleteAppointment(id);
      if (success) {
        setAppointments(prev => prev.filter(a => a.id !== id));
        return { success: true };
      }
      return { success: false, error: "Appointment not found" };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Failed to delete appointment" };
    }
  }, []);

  // Get appointment by ID
  const getAppointmentById = useCallback((id: string) => {
    return appointments.find(a => a.id === id) || null;
  }, [appointments]);

  // Refresh appointments
  const refresh = useCallback(() => {
    loadAppointments();
  }, [loadAppointments]);

  return {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    refresh,
  };
};

// Hook for statistics
type UseAppointmentStatsReturn = {
  stats: {
    total: number;
    today: number;
    thisWeek: number;
    uniqueClients: number;
    serviceBreakdown: Record<string, number>;
    topServices: [string, number][];
  };
  loading: boolean;
  refresh: () => void;
};

export const useAppointmentStats = (): UseAppointmentStatsReturn => {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    uniqueClients: 0,
    serviceBreakdown: {} as Record<string, number>,
    topServices: [] as [string, number][],
  });
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getStatistics();
      setStats(data);
    } catch (err) {
      console.error("Failed to load statistics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refresh = useCallback(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loading, refresh };
};