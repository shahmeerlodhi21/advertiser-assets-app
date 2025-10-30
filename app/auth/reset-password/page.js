"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

    // Validation
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Both password fields are required");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1500);
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  return (
    <div className="verify-page">
      <div className="verify-container" ref={containerRef}>
        <h2 className="verify-title" ref={titleRef}>
          Set a New Password
        </h2>
        <p className="verify-subtitle" ref={subtitleRef}>
          Create a strong password to keep your account safe and protected.
        </p>

        <form className="verify-form" ref={formRef} onSubmit={handleSubmit}>
          {/* New Password */}
          <div className={`email-field ${error ? "error-border" : ""}`}>
            <svg
              style={{ marginRight: "8px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                stroke="#5E5A5A"
                strokeWidth="1.2"
              />
              <path
                d="M6 10V8a6 6 0 0 1 12 0v2"
                stroke="#5E5A5A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="4"
                y="10"
                width="16"
                height="10"
                rx="2"
                stroke="#5E5A5A"
                strokeWidth="1.2"
              />
            </svg>
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowNew(!showNew)}
              style={{ cursor: "pointer" }}
            >
              {showNew ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M1.54688 9.26103C1.48437 9.09264 1.48437 8.90741 1.54688 8.73903C2.15565 7.26292 3.18902 6.00081 4.51596 5.1127C5.8429 4.22459 7.40366 3.75049 9.00038 3.75049C10.5971 3.75049 12.1579 4.22459 13.4848 5.1127C14.8117 6.00081 15.8451 7.26292 16.4539 8.73903C16.5164 8.90741 16.5164 9.09264 16.4539 9.26103C15.8451 10.7371 14.8117 11.9992 13.4848 12.8874C12.1579 13.7755 10.5971 14.2496 9.00038 14.2496C7.40366 14.2496 5.8429 13.7755 4.51596 12.8874C3.18902 11.9992 2.15565 10.7371 1.54688 9.26103Z"
                    stroke="#5E5A5A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                    stroke="#5E5A5A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11047)">
                    <path
                      d="M7 4.05663C8.74704 3.84843 10.5142 4.21774 12.0317 5.10816C13.5491 5.99859 14.7334 7.36118 15.4037 8.98788C15.4663 9.15626 15.4663 9.34149 15.4037 9.50988C15.1281 10.1781 14.7639 10.8063 14.3207 11.3774"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5631 10.6185C10.1387 11.0284 9.57039 11.2552 8.98045 11.25C8.39051 11.2449 7.82618 11.0083 7.40901 10.5911C6.99184 10.1739 6.75521 9.60961 6.75009 9.01966C6.74496 8.42972 6.97175 7.86137 7.3816 7.43701"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.1096 13.1243C12.1147 13.7137 11.0047 14.0821 9.8549 14.2046C8.70507 14.3272 7.54234 14.2009 6.4456 13.8345C5.34886 13.4681 4.34377 12.87 3.49854 12.0809C2.6533 11.2918 1.98769 10.3301 1.54688 9.26109C1.48437 9.0927 1.48437 8.90747 1.54688 8.73909C2.21185 7.12648 3.38188 5.77302 4.88138 4.88184"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.5 1.5L16.5 16.5"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11047">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </span>
          </div>

          {/* Confirm Password */}
          <div className={`email-field ${error ? "error-border" : ""}`}>
            <svg
              style={{ marginRight: "8px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                stroke="#5E5A5A"
                strokeWidth="1.2"
              />
              <path
                d="M6 10V8a6 6 0 0 1 12 0v2"
                stroke="#5E5A5A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="4"
                y="10"
                width="16"
                height="10"
                rx="2"
                stroke="#5E5A5A"
                strokeWidth="1.2"
              />
            </svg>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{ cursor: "pointer" }}
            >
              {showConfirm ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M1.54688 9.26103C1.48437 9.09264 1.48437 8.90741 1.54688 8.73903C2.15565 7.26292 3.18902 6.00081 4.51596 5.1127C5.8429 4.22459 7.40366 3.75049 9.00038 3.75049C10.5971 3.75049 12.1579 4.22459 13.4848 5.1127C14.8117 6.00081 15.8451 7.26292 16.4539 8.73903C16.5164 8.90741 16.5164 9.09264 16.4539 9.26103C15.8451 10.7371 14.8117 11.9992 13.4848 12.8874C12.1579 13.7755 10.5971 14.2496 9.00038 14.2496C7.40366 14.2496 5.8429 13.7755 4.51596 12.8874C3.18902 11.9992 2.15565 10.7371 1.54688 9.26103Z"
                    stroke="#5E5A5A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                    stroke="#5E5A5A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11047)">
                    <path
                      d="M7 4.05663C8.74704 3.84843 10.5142 4.21774 12.0317 5.10816C13.5491 5.99859 14.7334 7.36118 15.4037 8.98788C15.4663 9.15626 15.4663 9.34149 15.4037 9.50988C15.1281 10.1781 14.7639 10.8063 14.3207 11.3774"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5631 10.6185C10.1387 11.0284 9.57039 11.2552 8.98045 11.25C8.39051 11.2449 7.82618 11.0083 7.40901 10.5911C6.99184 10.1739 6.75521 9.60961 6.75009 9.01966C6.74496 8.42972 6.97175 7.86137 7.3816 7.43701"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.1096 13.1243C12.1147 13.7137 11.0047 14.0821 9.8549 14.2046C8.70507 14.3272 7.54234 14.2009 6.4456 13.8345C5.34886 13.4681 4.34377 12.87 3.49854 12.0809C2.6533 11.2918 1.98769 10.3301 1.54688 9.26109C1.48437 9.0927 1.48437 8.90747 1.54688 8.73909C2.21185 7.12648 3.38188 5.77302 4.88138 4.88184"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.5 1.5L16.5 16.5"
                      stroke="#5E5A5A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11047">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </span>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button
            type="submit"
            className="verify-btn"
            style={{ marginTop: "20px" }}
            ref={btnRef}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Reset Password"}
          </button>
        </form>
        <p
          className="support text-center m-auto flex"
          style={{ maxWidth: "400px", width: "90%" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            style={{marginRight: '-15px'}}
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
          Password must be at least 8 characters long and include one uppercase,
          one number, and one special character.
        </p>
      </div>

      <Modal
        show={showModal}
        onClose={handleModalClose}
        title="Password Reset Successful!"
        message="Your password has been updated successfully. You can now log in with your new credentials."
        buttonText="Back To Login"
      />
    </div>
  );
}
