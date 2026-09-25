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
import About from "./pages/About";
import AccountPage from "./pages/AccountPage";
import Contact from "./pages/Contact";
import FarmBro from "./pages/FarmBro";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
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
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-in/:rest*" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/sign-up/:rest*" component={SignUpPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  useSmoothScroll();

  return (
    <ErrorBoundary>
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
              <Router />
              <WhatsAppBadge />
            </div>
          </TooltipProvider>
          </OrderProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
