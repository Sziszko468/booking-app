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
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.replace("/login");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show nothing while checking auth
  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
