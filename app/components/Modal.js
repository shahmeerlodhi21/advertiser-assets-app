"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Modal({
  show,
  onClose,
  onButtonClick, // 👉 optional custom function
  title,
  message,
  buttonText = "OK",
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      gsap.fromTo(
        modalRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [show]);

  if (!show) return null;

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick(); // call custom function if provided
    onClose(); // close modal after custom action
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="iconContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
          >
            <path
              d="M27.9993 51.3334C40.886 51.3334 51.3327 40.8867 51.3327 28.0001C51.3327 15.1134 40.886 4.66675 27.9993 4.66675C15.1127 4.66675 4.66602 15.1134 4.66602 28.0001C4.66602 40.8867 15.1127 51.3334 27.9993 51.3334Z"
              stroke="#FF9032"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 27.9999L25.6667 32.6666L35 23.3333"
              stroke="#FF9032"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="message">{message}</p>
        <button className="button" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
