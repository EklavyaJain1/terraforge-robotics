import { SignUp } from "@clerk/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

export default function SignUpPage() {
  const { t } = useLanguage();
  usePageTitle(t.signUpTitle);
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="tf-page">
        <Navbar />
        <main className="px-6 pt-[96px] text-[#3F4B45]">
          Run <code className="tf-mono">npx clerk auth login</code> then <code className="tf-mono">npx clerk env pull</code> to enable sign-up.
        </main>
      </div>
    );
  }

  return (
    <div className="tf-page">
      <Navbar />
      <main className="flex min-h-[80vh] items-center justify-center px-4 pt-[72px] pb-16">
        <div className="w-full max-w-[420px]">
          <p className="tf-mono mb-4 text-[10px] text-[#1B8F6A]">{t.signUpKicker}</p>
          <h1 className="mb-8 text-4xl font-medium tracking-[-.05em]">{t.signUpHeading}</h1>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/account"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
