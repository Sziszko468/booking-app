export interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
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
