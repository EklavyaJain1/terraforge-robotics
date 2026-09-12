import { useEffect, useRef, useState } from "react";

/* FarmBro boot screen. Shows the mission for MIN_SHOW (3s) so it always
   reads as a deliberate title card; MAX_WAIT is only a safety cap. */
const MIN_SHOW = 3000;
const MAX_WAIT = 3400;

const missionLines = [
  "Autonomous machines for the people who feed us.",
  "Made in India. Proven in the field.",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(4);
  const [wiping, setWiping] = useState("wipe-in");
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    setWiping("wipe-out");
    window.setTimeout(() => {
      setGone(true);
      onDone();
    }, 700);
  }

  useEffect(() => {
    document.body.classList.add("boot-lock");
    const t0 = performance.now();

    const timer = window.setInterval(() => {
      const elapsed = performance.now() - t0;
      const target = elapsed < MIN_SHOW ? Math.min(96, 4 + (elapsed / MIN_SHOW) * 92) : 96;
      setProgress(target);
      if (elapsed >= MIN_SHOW) finish();
    }, 60);

    // Cap the wait no matter what.
    const cap = window.setTimeout(finish, MAX_WAIT);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(cap);
      document.body.classList.remove("boot-lock");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`boot-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F0D] text-white ${wiping}`}
      role="status"
      aria-label="FarmBro is loading"
    >
      {/* Field texture: faint plough rows */}
      <div aria-hidden="true" className="boot-rows" />

      <div className="relative flex w-full max-w-[560px] flex-col items-center px-8 text-center">
        <div className="reveal flex items-center gap-3">
          <img src="/images/mark-fallback.svg" alt="" className="h-9 w-9 object-contain brightness-0 invert" />
          <span className="text-[12px] font-semibold tracking-[.22em]">FARM BRO</span>
        </div>

        <p className="reveal reveal-delay-1 mt-9 max-w-[380px] text-sm leading-6 text-white/60">
          {missionLines[0]} {missionLines[1]}
        </p>

        <div className="reveal reveal-delay-2 mt-9 w-full">
          <div className="h-[3px] w-full overflow-hidden bg-white/10">
            <div
              className="boot-bar h-full bg-gradient-to-r from-[#1B8F6A] via-[#2BA97E] to-[#53C98B]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="tf-mono mt-3 flex items-center justify-between text-[10px] text-white/40">
            <span>PREPARING THE FIELD</span>
            <span aria-hidden="true">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
