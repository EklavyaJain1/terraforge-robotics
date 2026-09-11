import { MoveUpRight } from "lucide-react";
import { AppMark } from "./Navbar";
import { useOrderForm } from "@/contexts/OrderContext";

export default function Footer() {
  const { openOrderForm } = useOrderForm();

  return (
    <footer className="tf-dark border-t border-white/10 py-10 sm:py-14">
      <div className="tf-container">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <AppMark dark />
            <p className="mt-5 max-w-[260px] text-sm leading-6 text-white/45">Field-ready autonomy for the next pass, and the one after that.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 sm:gap-x-16">
            <div className="tf-mono text-[10px] text-white/35">Explore</div>
            <div className="tf-mono text-[10px] text-white/35">Connect</div>
            <a href="/" className="text-sm text-white/70 hover:text-[#B9F4D4]">Home</a>
            <a href="mailto:hello@terraforge.example" className="text-sm text-white/70 hover:text-[#B9F4D4]">Email the team</a>
            <a href="/farmbro" className="text-sm text-white/70 hover:text-[#B9F4D4]">FarmBro</a>
            <a href="/contact" className="text-sm text-white/70 hover:text-[#B9F4D4]">Book a field visit</a>
            <a href="/services" className="text-sm text-white/70 hover:text-[#B9F4D4]">Services</a>
            <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-[#B9F4D4]">WhatsApp support</a>
            <a href="/about" className="text-sm text-white/70 hover:text-[#B9F4D4]">About</a>
            <span className="text-sm text-white/35">© 2026 TerraForge</span>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row">
          <span className="tf-mono">Made for real rows</span>
          <span>Autonomy, with both feet on the ground.</span>
        </div>
      </div>
    </footer>
  );
}
