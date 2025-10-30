"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./forgot.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const form = formRef.current;
    const btn = btnRef.current;

    gsap.set([container, title, subtitle, form, btn], { opacity: 0, y: 20 });

    tl.to(container, { opacity: 1, y: 0, duration: 0.3 })
      .to(title, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
      .to(form, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
      .to(btn, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");

    return () => tl.kill();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Password reset link sent successfully!");
    }, 1500);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container" ref={containerRef}>
        <h2 className="forgot-title" ref={titleRef}>
          Forgot Your Password?
        </h2>
        <p className="forgot-subtitle" ref={subtitleRef}>
          No worries — we’ll send you a secure link to reset your password.
        </p>

        <form className="forgot-form" ref={formRef} onSubmit={handleSubmit}>
          <div className={`email-field ${error ? "error-border" : ""}`}>
            <input
              type="text"
              placeholder="Registered Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="forgot-btn" ref={btnRef} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Send Reset Link"}
          </button>
        </form>

        <p className="forgot-info">
          ⚠️ Check your inbox and follow the link to set a new password. The link
          will expire in 15 minutes for your security.
        </p>
      </div>
    </div>
  );
}
