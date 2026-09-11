import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import OrderFormDialog from "@/components/OrderFormDialog";

interface OrderContextValue {
  openOrderForm: (robotName?: string) => void;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderRobot, setOrderRobot] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const openOrderForm = useCallback((robotName?: string) => {
    setOrderRobot(robotName ?? null);
    setOpen(true);
  }, []);

  const closeOrderForm = useCallback(() => setOpen(false), []);

  return (
    <OrderContext.Provider value={{ openOrderForm }}>
      {children}
      <OrderFormDialog
        open={open}
        onOpenChange={(next) => (next ? setOpen(true) : closeOrderForm())}
        defaultRobot={orderRobot ?? undefined}
      />
    </OrderContext.Provider>
  );
}

export function useOrderForm() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderForm must be used within OrderProvider");
  }
  return context;
}
