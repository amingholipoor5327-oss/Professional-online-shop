 "use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import styles from "../css/userprofile.module.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const session = await response.json();

        setUser(session?.user || null);
      } catch (error) {
        console.error("Could not load user:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className={styles.Loading}>
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const name = user.name || "Admin";
  const email = user.email || "No email";
  const image = user.image;

  return (
    <section className={styles.Card}>
      <div className={styles.ProfileHeader}>
        <div className={styles.AvatarWrapper}>
          <div className={styles.Avatar}>
            {image ? (
              <img
                src={image}
                alt={name}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <span className={styles.Online}></span>
        </div>

        <div className={styles.UserInfo}>
          <div className={styles.NameRow}>
            <h2>{name}</h2>

            <span className={styles.Active}>
              <FaCheckCircle />
              Active
            </span>
          </div>

          <p>{email}</p>

          <span className={styles.Role}>
            <FaShieldAlt />
            Administrator
          </span>
        </div>
      </div>

      <div className={styles.Details}>
        <div className={styles.Detail}>
          <FaUser />

          <div>
            <small>Full Name</small>
            <strong>{name}</strong>
          </div>
        </div>

        <div className={styles.Detail}>
          <FaEnvelope />

          <div>
            <small>Email</small>
            <strong>{email}</strong>
          </div>
        </div>

        <div className={styles.Detail}>
          <FaShieldAlt />

          <div>
            <small>Role</small>
            <strong>Administrator</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
 