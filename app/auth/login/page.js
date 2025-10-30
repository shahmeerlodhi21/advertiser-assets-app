"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const logoRef = useRef();
  const titleRef = useRef();
  const formRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const btnRef = useRef();
  const subtitleRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    const left = leftRef.current;
    const right = rightRef.current;
    const logo = logoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const form = formRef.current;
    const btn = btnRef.current;

    if (!left || !right || !logo || !title || !subtitle || !form || !btn)
      return;

    const fields = form.querySelectorAll(".field");

    // 1️⃣ Hide everything first
    gsap.set([left, right, logo, title, subtitle, fields, btn], {
      opacity: 0,
      y: 18,
    });

    // 2️⃣ Faster, cleaner sequence
    tl.to(left, { opacity: 1, y: 0, duration: 0.35 })
      .to(right, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
      .to(logo, { opacity: 1, y: 0, duration: 0.25 }, "-=0.15")
      .to(title, { opacity: 1, y: 0, duration: 0.25 }, "-=0.2")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.25 }, "-=0.15")
      .to(fields, { opacity: 1, y: 0, stagger: 0.06, duration: 0.25 }, "-=0.15")
      .to(btn, { opacity: 1, y: 0, scale: 1, duration: 0.3 }, "-=0.15");

    return () => tl.kill();
  }, []);


  // Basic validation
  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1200));
      // For now, show alert with saved data (will replace with API later)
      alert(JSON.stringify({ email, password, remember }, null, 2));
      // optionally save to localStorage for demo:
      if (remember) localStorage.setItem("demoAuth", JSON.stringify({ email }));
      // reset or redirect based on role later
    } catch (err) {
      console.error(err);
      alert("Something went wrong (demo).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in — Advertiser Assets</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <main className="login-root">
        <section className="login-card">
          <div className="left" ref={leftRef}>
            <div className="left-inner">
              <div className="logo" ref={logoRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 53 52"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_11023)">
                    <path
                      d="M52.9997 50.4951H39.8635L24.2772 22.9554L23.651 23.1421L22.4596 25.523L21.8302 25.5628L15.7784 14.769C15.6898 14.1815 17.0951 11.8709 17.5075 11.1181C19.5665 7.35698 21.9372 3.5316 24.2772 0L52.9966 50.4951H52.9997Z"
                      fill="#EF7520"
                    />
                    <path
                      d="M19.8541 51.1072L7.16699 29.2046L9.87366 23.9715L13.7412 17.7468L32.8376 51.1072H19.8541Z"
                      fill="#313131"
                    />
                    <path
                      d="M15.4239 51.1071H6.10634C4.72246 51.1071 2.52291 49.2739 1.6828 48.1937C-2.50245 42.7892 2.08911 37.7978 4.88132 33.0574L15.4208 51.1071H15.4239Z"
                      fill="#474747"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11023">
                      <rect width="53" height="51.1071" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <h1 className="title" ref={titleRef}>
                Welcome Back<span style={{ fontFamily: "Onest" }}>!</span>
              </h1>
              <p className="subtitle" ref={subtitleRef}>
                Sign in to your Advertiser Assets Account.
              </p>

              <form
                className="form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="field">
                  <label className="label">Email Address</label>
                  <div
                    className={`input-wrapper ${errors.email ? "error" : ""}`}
                  >
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.3337 5.83325L10.8412 10.6058C10.5869 10.7534 10.2981 10.8312 10.0041 10.8312C9.71004 10.8312 9.42125 10.7534 9.16699 10.6058L1.66699 5.83325"
                        stroke="#5E5A5A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.667 3.33325H3.33366C2.41318 3.33325 1.66699 4.07944 1.66699 4.99992V14.9999C1.66699 15.9204 2.41318 16.6666 3.33366 16.6666H16.667C17.5875 16.6666 18.3337 15.9204 18.3337 14.9999V4.99992C18.3337 4.07944 17.5875 3.33325 16.667 3.33325Z"
                        stroke="#5E5A5A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div
                    className={`input-wrapper ${
                      errors.password ? "error" : ""
                    }`}
                  >
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M14.25 8.25H3.75C2.92157 8.25 2.25 8.92157 2.25 9.75V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V9.75C15.75 8.92157 15.0784 8.25 14.25 8.25Z"
                        stroke="#5E5A5A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.25 8.25V5.25C5.25 4.25544 5.64509 3.30161 6.34835 2.59835C7.05161 1.89509 8.00544 1.5 9 1.5C9.99456 1.5 10.9484 1.89509 11.6516 2.59835C12.3549 3.30161 12.75 4.25544 12.75 5.25V8.25"
                        stroke="#5E5A5A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={0}
                    >
                      {showPassword ? (
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
                    </button>
                  </div>
                  {errors.password && (
                    <p className="error-text">{errors.password}</p>
                  )}
                </div>

                <div className="meta-row">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember((v) => !v)}
                      disabled={loading}
                    />
                    <span>Remember Me</span>
                  </label>

                  <a
                    className="forgot"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      redirect('/auth/forgot-password')
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="field">
                  <button
                    className="login-btn"
                    style={{ width: "100%" }}
                    type="submit"
                    ref={btnRef}
                    disabled={loading}
                  >
                    {!loading && <span className="btn-text">Login</span>}
                    {loading && (
                      <span className="spinner-wrapper" aria-hidden>
                        <span className="spinner"></span>
                      </span>
                    )}
                  </button>
                </div>

                <p className="security-note">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M7.5 10.625C7.84518 10.625 8.125 10.3452 8.125 10C8.125 9.65482 7.84518 9.375 7.5 9.375C7.15482 9.375 6.875 9.65482 6.875 10C6.875 10.3452 7.15482 10.625 7.5 10.625Z"
                      stroke="#313131"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.875 6.25H3.125C2.43464 6.25 1.875 6.80964 1.875 7.5V12.5C1.875 13.1904 2.43464 13.75 3.125 13.75H11.875C12.5654 13.75 13.125 13.1904 13.125 12.5V7.5C13.125 6.80964 12.5654 6.25 11.875 6.25Z"
                      stroke="#313131"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.375 6.25V4.375C4.375 3.5462 4.70424 2.75134 5.29029 2.16529C5.87634 1.57924 6.6712 1.25 7.5 1.25C8.3288 1.25 9.12366 1.57924 9.70971 2.16529C10.2958 2.75134 10.625 3.5462 10.625 4.375V6.25"
                      stroke="#313131"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    Protected with advanced encryption and 2FA security.
                  </span>
                </p>
              </form>
            </div>
          </div>

          <div className="right" ref={rightRef} aria-hidden>
            {/* background image via css; keep image element for accessibility on small screens */}
            <div className="right-image" />
          </div>
        </section>
      </main>
    </>
  );
}
