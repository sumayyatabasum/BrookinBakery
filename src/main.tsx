import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";
import { QuickViewProvider } from "./context/QuickViewContext";
import { DrawerProvider } from "./context/DrawerContext";

// wrap inside existing providers:

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider>
      <DrawerProvider>
        <QuickViewProvider>
          <App />
        </QuickViewProvider>
      </DrawerProvider>
    </CartProvider>
  </BrowserRouter>,
);
