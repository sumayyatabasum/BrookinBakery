import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { DrawerProduct } from "../components/ProductDrawer";


interface DrawerContextType {
  openDrawer: (product: DrawerProduct) => void;
  closeDrawer: () => void;
  activeProduct: DrawerProduct | null;
}

const DrawerContext = createContext<DrawerContextType>({
  openDrawer: () => {},
  closeDrawer: () => {},
  activeProduct: null,
});

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<DrawerProduct | null>(
    null,
  );

  return (
    <DrawerContext.Provider
      value={{
        activeProduct,
        openDrawer: (p) => setActiveProduct(p),
        closeDrawer: () => setActiveProduct(null),
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawer = () => useContext(DrawerContext);
