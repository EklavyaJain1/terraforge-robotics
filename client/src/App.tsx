import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import BootScreen from "./components/BootScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useSmoothScroll } from "./lib/smoothScroll";
import { Sentry } from "./lib/sentry";
import { ClerkProvider } from "@clerk/react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FarmBro from "./pages/FarmBro";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import WhatsAppBadge from "./components/WhatsAppBadge";

/* Every route change starts at the top — product pages open from card grids. */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/farmbro" component={FarmBro} />
      <Route path="/farmbro/:slug" component={ProductDetail} />
      <Route path="/services" component={Services} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/** Sentry's fallback UI for uncaught render errors — brand-matched, no stack traces. */
function SentryFallback({ error, resetError }: { error: unknown; resetError: () => void }) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8 text-[#111311]">
      <div className="max-w-md text-center">
        <p className="tf-mono text-[10px] text-[#1B8F6A]">SOMETHING BROKE</p>
        <h1 className="mt-3 text-2xl font-medium tracking-[-.03em]">The page hit an unexpected error.</h1>
        <p className="mt-3 text-sm text-[#59655F]">{message}</p>
        <button type="button" onClick={resetError} className="tf-btn tf-btn-outline mt-6">
          Try again
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  useSmoothScroll();

  // The site runs without Clerk configured (marketing-only local dev);
  // account features (order submission) need a publishable key.
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
  if (!clerkKey) {
    console.warn("[FarmBro] VITE_CLERK_PUBLISHABLE_KEY is not set — order submission requires Clerk. See .env.example.");
  }

  return (
    <Sentry.ErrorBoundary fallback={SentryFallback}>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <OrderProvider>
            <TooltipProvider>
              {/* The app mounts underneath immediately; the boot screen covers it
                  and wipes away once the first frame can actually paint. */}
              {!booted && <BootScreen onDone={() => setBooted(true)} />}
              <div aria-hidden={!booted}>
                <Toaster />
                <ScrollToTop />
                {clerkKey ? (
                  <ClerkProvider publishableKey={clerkKey}>
                    <Router />
                  </ClerkProvider>
                ) : (
                  <Router />
                )}
                <WhatsAppBadge />
              </div>
            </TooltipProvider>
          </OrderProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  );
}
