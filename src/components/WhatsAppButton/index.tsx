"use client";

import React from "react";

// Use the user's WhatsApp number by default; will fall back to env var if provided
const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+923457777799";
const defaultMessage = "Hi! I have a question about your services.";

export default function WhatsAppButton({
  phone = defaultNumber,
  message = defaultMessage,
}: {
  phone?: string;
  message?: string;
}) {
  const safePhone = phone.replace(/[^0-9+]/g, "");
  const href = `https://wa.me/${encodeURIComponent(safePhone)}?text=${encodeURIComponent(
    message
  )}`;

  return (
    // raised bottom value to avoid overlap with other floating UI (scroll arrow)
    <div style={{ position: "fixed", right: 20, bottom: 84, zIndex: 60 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="group"
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#25D366",
            boxShadow: "0 6px 18px rgba(37,211,102,0.24)",
            transition: "transform 160ms ease, box-shadow 160ms ease",
          }}
          className="hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M20.52 3.48A11.93 11.93 0 0012 0C5.373 0 .04 4.97.04 11.12c0 1.95.51 3.85 1.48 5.52L0 24l7.64-1.99A11.9 11.9 0 0012 22.24c6.627 0 11.96-4.97 11.96-11.12 0-3-1.16-5.77-3.44-7.64z"
              fill="#075E54"
            />
            <path
              d="M17.38 14.08c-.27-.14-1.6-.79-1.85-.88-.25-.1-.42-.14-.6.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.6.07-.27-.14-1.13-.42-2.15-1.33-.8-.72-1.34-1.62-1.5-1.9-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.45-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.95.92-.95 2.25 0 1.33.98 2.62 1.12 2.8.14.18 1.93 2.96 4.68 4.16 3.25 1.44 3.25 0 3.83-.27.18-.09 1.6-.65 1.82-1.27.23-.63.23-1.17.16-1.27-.07-.1-.25-.14-.52-.27z"
              fill="#fff"
            />
          </svg>
        </div>
      </a>
    </div>
  );
}
