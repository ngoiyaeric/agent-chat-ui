import React, { createContext, useContext, useState, useEffect } from "react";
import { BillingModal } from "@/components/billing-modal";

interface BillingContextType {
  openBilling: () => void;
  closeBilling: () => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export function BillingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically open billing popup on application launch
    const hasOpened = sessionStorage.getItem("billing_popup_opened");
    if (!hasOpened) {
      setIsOpen(true);
      sessionStorage.setItem("billing_popup_opened", "true");
    }
  }, []);

  const openBilling = () => setIsOpen(true);
  const closeBilling = () => setIsOpen(false);

  return (
    <BillingContext.Provider value={{ openBilling, closeBilling }}>
      {children}
      <BillingModal open={isOpen} onOpenChange={setIsOpen} />
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error("useBilling must be used within a BillingProvider");
  }
  return context;
}
