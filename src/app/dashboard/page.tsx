import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h2>Dashboard</h2>
        <p>Overview of appointments</p>
      </AdminLayout>
    </ProtectedRoute>
  );
}
