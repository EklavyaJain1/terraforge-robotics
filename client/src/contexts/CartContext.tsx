import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { catalogItem, type CartItemKind, type CartItemId } from "@/data/catalog";

export interface CartLine {
  kind: CartItemKind;
  id: CartItemId;
  qty: number;
}

/** How long the "added to cart" reveal stays highlighted after an add. */
export const ADDED_FLASH_MS = 2000;

interface CartContextValue {
  lines: CartLine[];
  count: number;
  /** Total in paise. */
  subtotal: number;
  isOpen: boolean;
  /** Line just added — drives the 2s slide-in reveal; null when the flash is over. */
  lastAdded: { kind: CartItemKind; id: CartItemId; at: number } | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (kind: CartItemKind, id: CartItemId) => void;
  removeLine: (kind: CartItemKind, id: CartItemId) => void;
  setQty: (kind: CartItemKind, id: CartItemId, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "farmbro.cart.v1";

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        !!line &&
        typeof line === "object" &&
        (line.kind === "robot" || line.kind === "attachment") &&
        typeof line.id === "string" &&
        typeof line.qty === "number" &&
        Number.isFinite(line.qty) &&
        !!catalogItem(line.kind, line.id as CartItemId),
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStored);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartContextValue["lastAdded"]>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode / quota — cart stays in memory */
    }
  }, [lines]);

  useEffect(() => () => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
  }, []);

  const addItem = useCallback((kind: CartItemKind, id: CartItemId) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.kind === kind && l.id === id);
      if (existing) {
        return prev.map((l) => (l.kind === kind && l.id === id ? { ...l, qty: Math.min(99, l.qty + 1) } : l));
      }
      return [...prev, { kind, id, qty: 1 }];
    });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setLastAdded({ kind, id, at: Date.now() });
    flashTimer.current = setTimeout(() => setLastAdded(null), ADDED_FLASH_MS);
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((kind: CartItemKind, id: CartItemId) => {
    setLines((prev) => prev.filter((l) => !(l.kind === kind && l.id === id)));
  }, []);

  const setQty = useCallback((kind: CartItemKind, id: CartItemId, qty: number) => {
    const next = Math.max(1, Math.min(99, Math.round(qty) || 1));
    setLines((prev) => prev.map((l) => (l.kind === kind && l.id === id ? { ...l, qty: next } : l)));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const item = catalogItem(line.kind, line.id);
      if (!item) continue;
      c += line.qty;
      s += item.price * line.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  return (
    <CartContext.Provider
      value={{ lines, count, subtotal, isOpen, lastAdded, openCart, closeCart, addItem, removeLine, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
