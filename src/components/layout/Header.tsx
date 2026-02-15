"use client";

import styles from "./Header.module.scss";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div>Admin Dashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
