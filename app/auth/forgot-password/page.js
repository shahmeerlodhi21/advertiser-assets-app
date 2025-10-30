"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function verifyPassword() {
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
    <div className="verify-page">
      <div className="verify-container" ref={containerRef}>
        <h2 className="verify-title" ref={titleRef}>
          Forgot Your Password?
        </h2>
        <p className="verify-subtitle" ref={subtitleRef}>
          No worries — we’ll send you a secure link to reset your password.
        </p>

        <form className="verify-form" ref={formRef} onSubmit={handleSubmit}>
          <div className={`email-field ${error ? "error-border" : ""}`}>
            <svg
              style={{ marginRight: "8px" }}
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M18.3327 5.83325L10.8402 10.6058C10.5859 10.7534 10.2971 10.8312 10.0031 10.8312C9.70907 10.8312 9.42027 10.7534 9.16602 10.6058L1.66602 5.83325"
                stroke="#5E5A5A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.666 3.33325H3.33268C2.41221 3.33325 1.66602 4.07944 1.66602 4.99992V14.9999C1.66602 15.9204 2.41221 16.6666 3.33268 16.6666H16.666C17.5865 16.6666 18.3327 15.9204 18.3327 14.9999V4.99992C18.3327 4.07944 17.5865 3.33325 16.666 3.33325Z"
                stroke="#5E5A5A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Registered Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="error-msg">{error}</p>}

          <button
            type="submit"
            className="verify-btn"
            style={{ marginTop: "20px" }}
            ref={btnRef}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Send Reset Link"}
          </button>
        </form>

        <p className="support text-center m-auto flex" style={{gap: '5px',maxWidth: '400px',width: '90%'}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M13.5808 11.2499L8.58078 2.4999C8.47176 2.30752 8.31366 2.14751 8.12261 2.03619C7.93156 1.92486 7.7144 1.86621 7.49328 1.86621C7.27216 1.86621 7.055 1.92486 6.86395 2.03619C6.6729 2.14751 6.5148 2.30752 6.40578 2.4999L1.40578 11.2499C1.29558 11.4407 1.2378 11.6573 1.23828 11.8777C1.23877 12.0981 1.29751 12.3144 1.40856 12.5048C1.5196 12.6951 1.679 12.8528 1.87059 12.9617C2.06218 13.0706 2.27916 13.1269 2.49953 13.1249H12.4995C12.7188 13.1247 12.9342 13.0668 13.1241 12.9569C13.3139 12.8471 13.4715 12.6893 13.5811 12.4993C13.6907 12.3094 13.7483 12.0939 13.7482 11.8746C13.7482 11.6553 13.6904 11.4398 13.5808 11.2499Z"
              stroke="#313131"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 5.625V8.125"
              stroke="#313131"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 10.625H7.5075"
              stroke="#313131"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{" "}
          Check your inbox and follow the link to set a new password. The link
          will expire in 15 minutes for your security.
        </p>
      </div>
    </div>
  );
}
