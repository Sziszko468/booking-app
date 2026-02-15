import { Appointment } from "@/types/appointment";

const STORAGE_KEY = "appointments";

export const getAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveAppointment = (appointment: Omit<Appointment, "id">): Appointment => {
  const appointments = getAppointments();
  
  const newAppointment: Appointment = {
    ...appointment,
    id: Date.now().toString(),
  };
  
  const updated = [...appointments, newAppointment];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  return newAppointment;
};

export const deleteAppointment = (id: string): void => {
  const appointments = getAppointments();
  const updated = appointments.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateAppointment = (id: string, data: Partial<Appointment>): void => {
  const appointments = getAppointments();
  const updated = appointments.map((a) =>
    a.id === id ? { ...a, ...data } : a
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};