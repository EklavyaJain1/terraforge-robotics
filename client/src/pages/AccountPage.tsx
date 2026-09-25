import { useAuth, useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import { Redirect } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { apiFetch } from "@/lib/api";

interface MeResponse {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  enquiries: { id: string; topic: string; createdAt: string }[];
}

export default function AccountPage() {
  const { t } = useLanguage();
  usePageTitle(t.accountTitle);
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="tf-page">
        <Navbar />
        <main className="px-6 pt-[96px] text-[#3F4B45]">
          Run <code className="tf-mono">npx clerk auth login</code> then <code className="tf-mono">npx clerk env pull</code> to enable accounts.
        </main>
      </div>
    );
  }
  return <AccountLoaded />;
}

function AccountLoaded() {
  const { t } = useLanguage();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getToken();
        const data = (await apiFetch("/api/me", { method: "GET" }, token)) as MeResponse;
        if (!cancelled) setMe(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : t.accountLoadError);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getToken, isLoaded, isSignedIn, t.accountLoadError]);

  if (!isLoaded) {
    return (
      <div className="tf-page">
        <Navbar />
        <main className="pt-[72px] px-6 py-24 text-[#59655F]">{t.accountLoading}</main>
      </div>
    );
  }

  if (!isSignedIn) return <Redirect to="/sign-in" />;

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container max-w-2xl">
            <p className="tf-mono text-[10px] text-[#1B8F6A]">{t.accountKicker}</p>
            <h1 className="mt-4 text-5xl font-medium tracking-[-.05em]">{t.accountHeading}</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-[#3F4B45]">{t.accountSub}</p>
            <dl className="mt-10 grid gap-6 border border-[#111311]/15 bg-white p-6">
              <div>
                <dt className="tf-mono text-[9px] text-[#64736C]">{t.accountName}</dt>
                <dd className="mt-1 text-lg">{user?.fullName || "—"}</dd>
              </div>
              <div>
                <dt className="tf-mono text-[9px] text-[#64736C]">{t.accountEmail}</dt>
                <dd className="mt-1 text-lg">{me?.email ?? user?.primaryEmailAddress?.emailAddress ?? "—"}</dd>
              </div>
              <div>
                <dt className="tf-mono text-[9px] text-[#64736C]">{t.accountUserId}</dt>
                <dd className="mt-1 break-all font-mono text-sm text-[#59655F]">{me?.id ?? user?.id}</dd>
              </div>
            </dl>
            {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
            {me?.enquiries?.length ? (
              <ul className="mt-10 space-y-3">
                {me.enquiries.map((item) => (
                  <li key={item.id} className="border border-[#111311]/15 p-4">
                    <p className="font-medium">{item.topic}</p>
                    <p className="tf-mono mt-1 text-[9px] text-[#64736C]">{item.createdAt}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
