 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "../component/css/login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

   async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: "/api/auth/sync-admin-session",
      });
    } catch {
      setError("Google login could not be started.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Admin Login</h1>

        <p className={styles.description}>
          Sign in to manage your store.
        </p>

        <label htmlFor="email" className={styles.label}>
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
          required
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || googleLoading}
          className={styles.loginButton}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className={styles.divider}>
          <span />
          <p>OR</p>
          <span />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className={styles.googleButton}
        >
          <svg
            className={styles.googleIcon}
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.27 5.64c4.25-3.92 7.49-9.71 7.49-17.29Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.8 23.8 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.27-5.64c-2.02 1.35-4.6 2.15-8.64 2.15-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
            />
          </svg>

          {googleLoading
            ? "Redirecting to Google..."
            : "Continue with Google"}
        </button>
      </form>
    </main>
  );
}
 