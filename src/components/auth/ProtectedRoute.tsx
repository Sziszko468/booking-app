"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/auth";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Use a flag to prevent state updates after unmount
    let mounted = true;

    const checkAuth = () => {
      const authenticated = isAuthenticated();
      console.log("🔒 ProtectedRoute - Auth check:", authenticated);
      console.log("🔒 localStorage token:", typeof window !== "undefined" ? localStorage.getItem("token") : "SSR");
      
      if (!authenticated) {
        console.log("🔒 Not authenticated, redirecting to /login");
        router.replace("/login");
      } else {
        console.log("🔒 Authenticated, rendering protected content");
        if (mounted) {
          setIsChecking(false);
        }
      }
    };

    // Small delay to ensure client-side hydration
    const timer = setTimeout(checkAuth, 0);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [router]);

  // Show loading spinner while checking auth
  if (isChecking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "3px solid var(--border-strong)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}
