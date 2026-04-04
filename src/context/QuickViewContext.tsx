import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
export interface QuickViewProduct {
  id: string;
  name: string;
  price: string;
  img: string;
  hoverImg?: string | null;
  description?: string;
  badge?: string;
}

interface QuickViewContextType {
  product: QuickViewProduct | null;
  open: (product: QuickViewProduct) => void;
  close: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | null>(null);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<QuickViewProduct | null>(null);

  const open = (p: QuickViewProduct) => setProduct(p);
  const close = () => setProduct(null);

  return (
    <QuickViewContext.Provider value={{ product, open, close }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx)
    throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
}
