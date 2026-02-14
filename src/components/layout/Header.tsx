"use client";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>Admin Dashboard</div>
      <div className={styles.user}>Admin</div>
    </header>
  );
}
