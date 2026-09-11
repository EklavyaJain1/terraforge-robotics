export default function SectionKicker({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? "text-white/60" : "text-[#64736C]"}`}>
      <span className="tf-mono text-[10px]">{number}</span>
      <span className={`h-px w-8 ${light ? "bg-white/30" : "bg-[#111311]/25"}`} />
      <span className="tf-mono text-[10px]">{label}</span>
    </div>
  );
}
