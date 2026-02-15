"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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

const STORAGE_KEY = "appointments";

export default function DashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = () => {
      if (typeof window !== "undefined" && isMounted) {
        const stored = localStorage.getItem(STORAGE_KEY);
        setAppointments(stored ? JSON.parse(stored) : []);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate statistics
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === today);
  const upcomingAppointments = appointments.filter(a => a.date >= today).slice(0, 5);
  
  // Services breakdown
  const serviceStats = appointments.reduce((acc, app) => {
    acc[app.service] = (acc[app.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topServices = Object.entries(serviceStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // This week stats
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStartStr = weekStart.toISOString().split('T')[0];
  
  const thisWeekAppointments = appointments.filter(a => a.date >= weekStartStr);

  // Stats cards data
  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: <Calendar className="text-blue-600" size={24} />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: <Clock className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+3",
      changeType: "positive" as const
    },
    {
      title: "This Week",
      value: thisWeekAppointments.length,
      icon: <TrendingUp className="text-green-600" size={24} />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Unique Clients",
      value: new Set(appointments.map(a => a.email)).size,
      icon: <Users className="text-orange-600" size={24} />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+5",
      changeType: "positive" as const
    }
  ];

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
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here`s what`s happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.title}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <button
                  onClick={() => router.push("/appointments")}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight size={16} />
                </button>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="mx-auto text-gray-300 mb-3" size={48} />
                  <p className="text-gray-500 mb-4">No upcoming appointments</p>
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
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                      onClick={() => router.push("/appointments")}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {appointment.name.charAt(0)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {appointment.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {appointment.email}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.time}
                        </div>
                      </div>

                      <div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {appointment.service}
                        </span>
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
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="text-primary-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Top Services</h3>
              </div>

              {topServices.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No data yet</p>
              ) : (
                <div className="space-y-4">
                  {topServices.map(([service, count], index) => {
                    const percentage = (count / appointments.length) * 100;
                    return (
                      <div key={service}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{service}</span>
                          <span className="text-sm font-semibold text-gray-900">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-blue-600' : 
                              index === 1 ? 'bg-purple-600' : 
                              'bg-green-600'
                            }`}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/appointments/new")}
                  className="w-full btn-primary justify-center py-3"
                >
                  <Plus size={18} />
                  New Appointment
                </button>
                <button
                  onClick={() => router.push("/appointments")}
                  className="w-full btn-secondary justify-center py-3"
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
                  <span className="font-semibold text-gray-900">{todayAppointments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600 flex items-center gap-1">
                    <CheckCircle size={16} />
                    {Math.floor(todayAppointments.length * 0.7)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-semibold text-blue-600 flex items-center gap-1">
                    <Clock size={16} />
                    {Math.ceil(todayAppointments.length * 0.3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
