"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Briefcase, 
  Save,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function NewAppointmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      // Save to localStorage
      const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const newAppointment = {
        id: Date.now().toString(),
        ...appointmentData,
      };
      
      appointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      // Success
      setSuccess(true);
      setLoading(false);

      // Redirect after 1.5 seconds
      setTimeout(() => {
        router.push("/appointments");
      }, 1500);
    } catch {
      setError("Failed to create appointment. Please try again.");
      setLoading(false);
    }
  };

  const services = [
    "Consultation",
    "Follow-up",
    "Treatment",
    "Check-up",
    "Therapy Session",
    "Assessment",
  ];

  if (success) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="max-w-2xl mx-auto">
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Created!
              </h2>
              <p className="text-gray-600 mb-4">
                The appointment has been successfully scheduled.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to appointments list...
              </p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">New Appointment</h2>
            <p className="text-gray-600 mt-1">Schedule a new appointment for a client</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card space-y-6">
            {/* Client Name */}
            <div>
              <label className="label">
                <User size={16} className="inline mr-2" />
                Client Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter client's full name"
                className="input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <Mail size={16} className="inline mr-2" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="client@example.com"
                className="input"
              />
            </div>

            {/* Date & Time Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="label">
                  <Calendar size={16} className="inline mr-2" />
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input"
                />
              </div>

              {/* Time */}
              <div>
                <label className="label">
                  <Clock size={16} className="inline mr-2" />
                  Time
                </label>
                <input
                  name="time"
                  type="time"
                  required
                  className="input"
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="label">
                <Briefcase size={16} className="inline mr-2" />
                Service Type
              </label>
              <select
                name="service"
                required
                className="input"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Appointment
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading}
                className="btn-secondary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Helper text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> The client will receive a confirmation email after the appointment is created.
            </p>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}