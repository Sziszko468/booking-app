"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAppointmentStats } from "@/hooks/useAppointments";
import * as appointmentService from "@/services/appointmentApi";
import { Appointment } from "@/types/appointment";
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { stats, loading: statsLoading } = useAppointmentStats();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUpcoming = async () => {
      try {
        const upcoming = await appointmentService.getUpcomingAppointments(5);
        setUpcomingAppointments(upcoming);
      } catch (error) {
        console.error("Failed to load upcoming appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUpcoming();
  }, []);

  if (loading || statsLoading) {
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

  const statsCards = [
    {
      title: "Total Appointments",
      value: stats.total,
      icon: <Calendar className="text-blue-600" size={24} />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Today's Appointments",
      value: stats.today,
      icon: <Clock className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+3",
      changeType: "positive" as const
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: <TrendingUp className="text-green-600" size={24} />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Unique Clients",
      value: stats.uniqueClients,
      icon: <Users className="text-orange-600" size={24} />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+5",
      changeType: "positive" as const
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-1">Welcome back! Here`s your overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm mt-2 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
                  <button
                    onClick={() => router.push("/appointments")}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                  >
                    View All
                    <ArrowRight size={16} />
                  </button>
                </div>

                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-600 mb-4">No upcoming appointments</p>
                    <button
                      onClick={() => router.push("/appointments/new")}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Create Appointment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => router.push("/appointments")}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {appointment.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-gray-900 truncate">{appointment.name}</p>
                              <span className="text-sm text-gray-600 flex items-center gap-1">
                                <Clock size={14} />
                                {appointment.time}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <p className="text-gray-600 truncate">{appointment.email}</p>
                              <p className="text-gray-500">
                                {new Date(appointment.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {appointment.service}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Top Services */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Services</h3>
                {stats.topServices.length === 0 ? (
                  <div className="text-center py-6">
                    <Briefcase className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-600">No services yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.topServices.map(([service, count], index) => {
                      const colors = [
                        'bg-blue-500',
                        'bg-purple-500',
                        'bg-green-500'
                      ];
                      const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

                      return (
                        <div key={service}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{service}</span>
                            <span className="text-sm text-gray-600">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${colors[index]} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/appointments/new")}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    New Appointment
                  </button>
                  <button
                    onClick={() => router.push("/appointments")}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    View All Appointments
                  </button>
                </div>
              </div>

              {/* Today's Summary */}
              <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today`s Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-gray-900">{stats.today}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={18} />
                      <span className="text-sm text-gray-700">Completed</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(stats.today * 0.7)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="text-blue-600" size={18} />
                      <span className="text-sm text-gray-700">Pending</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(stats.today * 0.3)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}