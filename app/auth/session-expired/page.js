"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { redirect } from "next/navigation";

export default function sessionExpired() {
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

  return (
    <div className="verify-page">
      <div
        className="verify-container flex flex-col items-center"
        ref={containerRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 108 108"
          fill="none"
        >
          <path
            d="M90 58.5001C90 81.0001 74.25 92.2501 55.53 98.7751C54.5497 99.1073 53.4849 99.0914 52.515 98.7301C33.75 92.2501 18 81.0001 18 58.5001V27.0001C18 25.8066 18.4741 24.662 19.318 23.8181C20.1619 22.9742 21.3065 22.5001 22.5 22.5001C31.5 22.5001 42.75 17.1001 50.58 10.2601C51.5333 9.44556 52.7461 8.99805 54 8.99805C55.2539 8.99805 56.4667 9.44556 57.42 10.2601C65.295 17.1451 76.5 22.5001 85.5 22.5001C86.6935 22.5001 87.8381 22.9742 88.682 23.8181C89.5259 24.662 90 25.8066 90 27.0001V58.5001Z"
            stroke="#FF9032"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M54 36V54"
            stroke="#FF9032"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M54 72H54.045"
            stroke="#FF9032"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2
          className="verify-title"
          style={{ marginTop: "25px" }}
          ref={titleRef}
        >
          Your Session Has Expired
        </h2>
        <p className="verify-subtitle" ref={subtitleRef}>
          For your account’s safety, you’ve been logged out due to inactivity.
          Please log in again to continue.
        </p>
        <button
          type="submit"
          className="verify-btn text-center"
          onClick={() => redirect("/auth/login")}
          style={{ marginTop: "10px", width: "auto", padding: "10px 50px" }}
          ref={btnRef}
        >
          Back To Login
        </button>
      </div>
    </div>
  );
}
