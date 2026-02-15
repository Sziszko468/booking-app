"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function NewAppointmentPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h2 className="text-3xl font-bold text-gray-900">New Appointment</h2>
        <p className="text-gray-600 mt-1">Create a new booking (Coming soon)</p>
      </AdminLayout>
    </ProtectedRoute>
  );
}
