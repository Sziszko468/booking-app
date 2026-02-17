import { Appointment, Client } from "@/types/appointment";
import { getAppointments } from "./appointmentApi";

export const getClients = async (): Promise<Client[]> => {
  const appointments = await getAppointments();

  const map = new Map<string, Appointment[]>();

  for (const appt of appointments) {
    const key = appt.email.toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(appt);
  }

  return Array.from(map.entries()).map(([, appts]) => {
    const sorted = [...appts].sort((a, b) => a.date.localeCompare(b.date));

    // top service
    const serviceCounts = appts.reduce((acc, a) => {
      acc[a.service] = (acc[a.service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topService = Object.entries(serviceCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;

    return {
      email: appts[0].email,
      name: appts[0].name,
      appointments: sorted,
      totalAppointments: appts.length,
      lastAppointment: sorted[sorted.length - 1]?.date ?? null,
      firstAppointment: sorted[0]?.date ?? null,
      topService,
    };
  }).sort((a, b) => b.totalAppointments - a.totalAppointments);
};
