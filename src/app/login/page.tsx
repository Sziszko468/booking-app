"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointments } from "@/hooks/useAppointments";
import { Trash2, Calendar, Clock, User, Mail, Briefcase, Plus } from "lucide-react";

export default function AppointmentsPage() {
  const router = useRouter();
  const { appointments, loading, deleteAppointment } = useAppointments();

  const handleDelete = async (id: string): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    const result = await deleteAppointment(id);
    
    if (!result.success) {
      alert(result.error || "Failed to delete appointment");
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Appointments</h2>
            <p className="text-gray-600 mt-1">Manage all your scheduled appointments</p>
          </div>
          <button
            onClick={() => router.push("/appointments/new")}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            New Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No appointments yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first appointment
            </p>
            <button
              onClick={() => router.push("/appointments/new")}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="card hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Main info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {appointment.name.charAt(0)}
                    </div>

                    {/* Details */}
                    <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Name & Email */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <User size={14} />
                          <span>Client</span>
                        </div>
                        <div className="font-semibold text-gray-900">
                          {appointment.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Mail size={14} />
                          {appointment.email}
                        </div>
                      </div>

                      {/* Date */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Calendar size={14} />
                          <span>Date</span>
                        </div>
                        <div className="font-semibold text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      {/* Time */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Clock size={14} />
                          <span>Time</span>
                        </div>
                        <div className="font-semibold text-gray-900">
                          {appointment.time}
                        </div>
                      </div>

                      {/* Service */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Briefcase size={14} />
                          <span>Service</span>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                            {appointment.service}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete appointment"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary card */}
        {appointments.length > 0 && (
          <div className="mt-6 card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Appointments</div>
                <div className="text-3xl font-bold text-gray-900">
                  {appointments.length}
                </div>
              </div>
              <Calendar className="text-blue-600" size={48} />
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}