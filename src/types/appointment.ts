export interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  email: string;
  name: string;
  appointments: Appointment[];
  totalAppointments: number;
  lastAppointment: string | null;
  firstAppointment: string | null;
  topService: string | null;
}
