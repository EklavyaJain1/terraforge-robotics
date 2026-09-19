import { useState } from "react";

export default function WhatsAppBadge() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "919401352202";
  const message = encodeURIComponent("Hi FarmBro, I'd like to know more about your robots!");

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center justify-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-end"
        aria-label="Chat with us on WhatsApp"
        style={{ textDecoration: "none" }}
      >
        {/* Expanding label on hover */}
        <span
          className="absolute right-[76px] z-0 overflow-hidden whitespace-nowrap rounded-full bg-white text-sm font-semibold text-[#111311] shadow-md transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{
            maxWidth: hovered ? "200px" : "0px",
            padding: hovered ? "10px 20px" : "10px 0px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(10px)",
          }}
        >
          Chat with us
        </span>

        {/* WhatsApp logo button */}
        <span className="relative z-10 flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-transparent transition-transform duration-300 hover:scale-110">
          {/* Ping animation */}
          <span className="absolute inset-2 z-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <img
            src="/images/whatsapp-logo.webp"
            alt="WhatsApp"
            className="relative z-10 h-full w-full object-contain drop-shadow-xl"
          />
        </span>
      </a>
    </div>
  );
}
