import { Appointment } from "@/types/appointment";
import { initialAppointments } from "@/data/appointments";
import { API_CONFIG, api, ApiError } from "./apiClient";

const STORAGE_KEY = "appointments";
const INITIALIZED_KEY = "appointments_initialized";

// ============================================================================
// LOCALSTORAGE IMPLEMENTATION
// ============================================================================

class LocalStorageProvider {
  private initializeStorage(): void {
    if (typeof window === "undefined") return;
    
    const isInitialized = localStorage.getItem(INITIALIZED_KEY);
    
    if (!isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAppointments));
      localStorage.setItem(INITIALIZED_KEY, "true");
    }
  }

  async getAll(): Promise<Appointment[]> {
    if (typeof window === "undefined") return [];
    
    this.initializeStorage();
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err: unknown) {
      console.error("Error reading appointments:", err);
      return [];
    }
  }

  async getById(id: string): Promise<Appointment | null> {
    const appointments = await this.getAll();
    return appointments.find(a => a.id === id) || null;
  }

  async create(data: Omit<Appointment, "id" | "createdAt" | "updatedAt">): Promise<Appointment> {
    const appointments = await this.getAll();

    const newAppointment: Appointment = {
      ...data,
      status: data.status ?? "scheduled",
      notes: data.notes ?? "",
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...appointments, newAppointment];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newAppointment;
  }

  async update(id: string, data: Partial<Omit<Appointment, "id" | "createdAt">>): Promise<Appointment | null> {
    const appointments = await this.getAll();
    const index = appointments.findIndex(a => a.id === id);

    if (index === -1) return null;

    const updated = appointments.map((a) =>
      a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated[index];
  }

  async delete(id: string): Promise<boolean> {
    const appointments = await this.getAll();
    const filtered = appointments.filter((a) => a.id !== id);
    
    if (filtered.length === appointments.length) {
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
}

// ============================================================================
// API IMPLEMENTATION
// ============================================================================

class ApiProvider {
  async getAll(): Promise<Appointment[]> {
    try {
      const response = await api.get<{ data: Appointment[] }>(
        API_CONFIG.ENDPOINTS.APPOINTMENTS
      );
      return response.data;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        throw new Error(`Failed to fetch appointments: ${err.message}`);
      }
      throw err;
    }
  }

  async getById(id: string): Promise<Appointment | null> {
    try {
      const response = await api.get<{ data: Appointment }>(
        `${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${id}`
      );
      return response.data;
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 404) {
        return null;
      }
      throw err;
    }
  }

  async create(data: Omit<Appointment, "id">): Promise<Appointment> {
    try {
      const response = await api.post<{ data: Appointment }>(
        API_CONFIG.ENDPOINTS.APPOINTMENTS,
        data
      );
      return response.data;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        throw new Error(`Failed to create appointment: ${err.message}`);
      }
      throw err;
    }
  }

  async update(id: string, data: Partial<Omit<Appointment, "id">>): Promise<Appointment | null> {
    try {
      const response = await api.patch<{ data: Appointment }>(
        `${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${id}`,
        data
      );
      return response.data;
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 404) {
        return null;
      }
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete(`${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${id}`);
      return true;
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 404) {
        return false;
      }
      throw err;
    }
  }
}

// ============================================================================
// UNIFIED DATA SERVICE (auto-switches based on API_CONFIG.USE_API)
// ============================================================================

const provider = API_CONFIG.USE_API ? new ApiProvider() : new LocalStorageProvider();

// Core CRUD operations
export const getAppointments = () => provider.getAll();
export const getAppointmentById = (id: string) => provider.getById(id);
export const createAppointment = (data: Omit<Appointment, "id">) => provider.create(data);
export const updateAppointment = (id: string, data: Partial<Omit<Appointment, "id">>) => 
  provider.update(id, data);
export const deleteAppointment = (id: string) => provider.delete(id);

// ============================================================================
// UTILITY FUNCTIONS (work with both providers)
// ============================================================================

export const getAppointmentsByDate = async (date: string): Promise<Appointment[]> => {
  const appointments = await getAppointments();
  return appointments.filter(a => a.date === date);
};

export const getAppointmentsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<Appointment[]> => {
  const appointments = await getAppointments();
  return appointments.filter(a => a.date >= startDate && a.date <= endDate);
};

export const getUpcomingAppointments = async (limit?: number): Promise<Appointment[]> => {
  const today = new Date().toISOString().split('T')[0];
  const appointments = await getAppointments();
  const upcoming = appointments
    .filter(a => a.date >= today)
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.time.localeCompare(b.time);
    });
  
  return limit ? upcoming.slice(0, limit) : upcoming;
};

export const getStatistics = async () => {
  const appointments = await getAppointments();
  const today = new Date().toISOString().split('T')[0];
  
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStartStr = weekStart.toISOString().split('T')[0];
  
  const serviceStats = appointments.reduce((acc, app) => {
    acc[app.service] = (acc[app.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: appointments.length,
    today: appointments.filter(a => a.date === today).length,
    thisWeek: appointments.filter(a => a.date >= weekStartStr).length,
    uniqueClients: new Set(appointments.map(a => a.email)).size,
    serviceBreakdown: serviceStats,
    topServices: Object.entries(serviceStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3),
  };
};

// ============================================================================
// DEVELOPMENT/TESTING UTILITIES
// ============================================================================

export const clearAllAppointments = (): void => {
  if (API_CONFIG.USE_API) {
    console.warn("Cannot clear appointments when using API");
    return;
  }
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(INITIALIZED_KEY);
};

export const exportAppointments = async (): Promise<string> => {
  const appointments = await getAppointments();
  return JSON.stringify(appointments, null, 2);
};

export const importAppointments = (jsonData: string): boolean => {
  if (API_CONFIG.USE_API) {
    console.warn("Cannot import appointments when using API");
    return false;
  }
  
  try {
    const appointments = JSON.parse(jsonData) as Appointment[];
    
    if (!Array.isArray(appointments)) {
      throw new Error("Invalid data format");
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    return true;
  } catch (err: unknown) {
    console.error("Error importing appointments:", err);
    return false;
  }
};

// ============================================================================
// PROVIDER INFO (for debugging)
// ============================================================================

export const getProviderInfo = () => ({
  type: API_CONFIG.USE_API ? "API" : "localStorage",
  baseUrl: API_CONFIG.USE_API ? API_CONFIG.BASE_URL : "N/A",
  isConfigured: API_CONFIG.USE_API ? !!process.env.NEXT_PUBLIC_API_URL : true,
});
