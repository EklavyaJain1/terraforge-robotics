import { Show, UserButton } from "@clerk/react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AuthControls() {
  const { t } = useLanguage();
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) return null;

  return (
    <div className="flex items-center gap-2">
      <Show when="signed-out">
        <Link href="/sign-in" className="tf-focus tf-mono text-[10px] text-white/80 hover:text-[#B9F4D4]">
          {t.signIn}
        </Link>
      </Show>
      <Show when="signed-in">
        <Link href="/account" className="tf-focus tf-mono text-[10px] text-white/80 hover:text-[#B9F4D4]">
          {t.account}
        </Link>
        <UserButton />
      </Show>
    </div>
  );
}
