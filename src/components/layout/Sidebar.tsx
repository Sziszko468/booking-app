"use client";

import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/appointments", label: "Appointments" },
    { href: "/appointments/new", label: "New Booking" },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Booking</h2>

      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${
              pathname === link.href ? styles.active : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
