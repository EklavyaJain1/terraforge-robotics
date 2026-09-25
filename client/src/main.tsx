import "./instrument";
import { ClerkProvider } from "@clerk/react";
import { shadcn } from "@clerk/ui/themes";
import { reactErrorHandler } from "@sentry/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const root = document.getElementById("root");
if (!root) throw new Error("Root element missing");

const tree = clerkKey ? (
  <ClerkProvider publishableKey={clerkKey} appearance={{ theme: shadcn }} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
) : (
  <App />
);

createRoot(root, {
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
}).render(tree);
