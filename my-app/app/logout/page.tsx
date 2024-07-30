"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import styles from './LogoutPage.module.css'; // Import the CSS module

export default function LogoutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.message}>SEE YOU SOON!!!</h1>
        <LogoutLink className={styles.logoutButton}>Logout</LogoutLink>
      </div>
    </div>
  );
}
