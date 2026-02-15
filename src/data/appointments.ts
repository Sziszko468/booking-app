import { Appointment } from "@/types/appointment";

export const initialAppointments: Appointment[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@test.com",
    date: "2026-03-10",
    time: "10:00",
    service: "Consultation",
  },
  {
    id: "2",
    name: "Anna Smith",
    email: "anna@test.com",
    date: "2026-03-11",
    time: "14:30",
    service: "Follow-up",
  },
];
