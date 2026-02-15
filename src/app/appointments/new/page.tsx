"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointments } from "@/hooks/useAppointments";
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Briefcase, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

const services = [
  "Consultation",
  "Follow-up",
  "Treatment",
  "Check-up",
  "Therapy Session",
  "Assessment",
];

export default function NewAppointmentPage() {
  const router = useRouter();
  const { createAppointment } = useAppointments();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const appointmentData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      service: formData.get("service") as string,
    };

    // Validation
    if (!appointmentData.name || !appointmentData.email || !appointmentData.date || !appointmentData.time || !appointmentData.service) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await createAppointment(appointmentData);

      if (result.success) {
        setSuccess(true);
        setLoading(false);

        // Redirect after 1.5 seconds
        setTimeout(() => {
          router.push("/appointments");
        }, 1500);
      } else {
        setError(result.error || "Failed to create appointment");
        setLoading(false);
      }
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="max-w-2xl mx-auto">
            <div className="card text-center py-12">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Created Successfully!
              </h2>
              <p className="text-gray-600">
                Redirecting to appointments list...
              </p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">New Appointment</h2>
            <p className="text-gray-600 mt-1">Schedule a new appointment for a client</p>
          </div>

          {/* Form Card */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    Client Name
                  </div>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Date
                  </div>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={today}
                  required
                  className="input-field"
                />
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    Time
                  </div>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  className="input-field"
                />
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Service Type
                  </div>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="input-field"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 flex-1"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Create Appointment
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="btn-secondary flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Info Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> An email notification will be sent to the client upon creating the appointment.
            </p>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}