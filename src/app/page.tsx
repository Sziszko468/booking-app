import Link from "next/link";
import { Calendar, Clock, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Calendar className="text-blue-600" size={24} />,
      title: "Easy Scheduling",
      description: "Intuitive calendar interface for managing appointments"
    },
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "Real-time Updates",
      description: "Instant notifications and synchronization across devices"
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      title: "Client Management",
      description: "Keep track of all your clients and their preferences"
    },
    {
      icon: <TrendingUp className="text-orange-600" size={24} />,
      title: "Analytics Dashboard",
      description: "Insights and reports to grow your business"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Appointments" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BookingHub
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/book" className="btn-secondary">
              Book Appointment
            </Link>
            <Link href="/login" className="btn-primary">
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
              <CheckCircle size={16} />
              Trusted by 10,000+ businesses
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simplify Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Booking </span>
              Process
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Modern appointment management system built for professionals. 
              Streamline scheduling, reduce no-shows, and grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="btn-primary py-4 px-8 text-lg inline-flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <button className="btn-secondary py-4 px-8 text-lg">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Calendar size={200} className="text-blue-600 opacity-20" />
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">15 appointments</div>
                  <div className="text-xs text-gray-500">Booked today</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-purple-600" size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">+28% growth</div>
                  <div className="text-xs text-gray-500">This month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage appointments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make scheduling effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals who trust BookingHub
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p className="text-sm">
            © 2026 BookingHub. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}