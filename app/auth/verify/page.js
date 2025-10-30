"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const containerRef = useRef(null);
  const btnRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Focus the first input by default
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Move to next input if value entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputsRef.current[index - 1].focus();
    }

    // Handle Ctrl + Z (undo)
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      const newCode = [...code];
      const lastFilled = newCode.findLastIndex((v) => v !== "");
      if (lastFilled >= 0) {
        newCode[lastFilled] = "";
        setCode(newCode);
        inputsRef.current[lastFilled]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    const newCode = [...code];
    pasted.forEach((val, i) => {
      if (i < 6) newCode[i] = val;
    });
    setCode(newCode);
    setError("");

    // Focus the last filled input
    const lastIndex = pasted.length - 1;
    if (lastIndex >= 0 && inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.some((c) => c === "")) {
      setError("Please enter your complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      alert("Verification successful! Code: " + code.join(""));
    }, 2000);
  };

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set([containerRef.current, btnRef.current, subtitleRef.current], {
      opacity: 0,
      y: 20,
    });
    tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.3 })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.25 }, "-=0.2")
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.25 }, "-=0.15");
  }, []);

  return (
    <div className="verify-page">
      <div className="verify-container" ref={containerRef}>
        <h2 className="verify-title">Verify Your Identity</h2>
        <p className="verify-subtitle" ref={subtitleRef}>
          For enhanced account protection, please enter the 6-digit verification
          code from your authenticator app or email.
        </p>

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="code-inputs" onPaste={handlePaste}>
            {code.map((val, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputsRef.current[i] = el)}
                className={`code-field ${error ? "error-border" : ""}`}
              />
            ))}
          </div>

          {error && <p className="error-msg">{error}</p>}

          <div className="verify-options">
            <label className="remember">
              <input type="checkbox" defaultChecked />
              Remember me for 30 days
            </label>
            <span className="remember">
              Didn’t receive the code?
              <a href="#" className="resend">
                Resend Code
              </a>
            </span>
          </div>

          <button
            ref={btnRef}
            type="submit"
            disabled={loading}
            className="verify-btn"
          >
            {loading ? <div className="spinner"></div> : "Verify & Continue"}
          </button>

          <p className="support flex items-center" style={{ gap: "5px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <g clipPath="url(#clip0_1_11115)">
                <path
                  d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                  stroke="#313131"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.68164 5.62511C5.82858 5.2074 6.11861 4.85518 6.50036 4.63082C6.88211 4.40646 7.33095 4.32445 7.76738 4.39931C8.2038 4.47417 8.59965 4.70106 8.88481 5.03982C9.16998 5.37857 9.32605 5.80731 9.32539 6.25011C9.32539 7.50011 7.45039 8.12511 7.45039 8.12511"
                  stroke="#313131"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 10.625H7.50625"
                  stroke="#313131"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_11115">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>{" "}
            <span>Having trouble?</span> <a href="#">Contact Support</a>
          </p>
        </form>
      </div>
    </div>
  );
}
