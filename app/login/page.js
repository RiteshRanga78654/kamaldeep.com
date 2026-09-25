import { Suspense } from "react";
import "./login.css";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign in — Kamaldeep.com",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-orb login-orb-a" />
      <div className="login-orb login-orb-b" />
      <Suspense fallback={<div className="login-card login-card-loading">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}