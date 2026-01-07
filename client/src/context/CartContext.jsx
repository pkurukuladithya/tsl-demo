import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api.js";
import { useAuth } from "./AuthContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { buildCartKey, mergeCartItems, stripCartKey } from "../utils/cart.js";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useLocalStorage("tsl_cart", []);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    let mounted = true;
    api.cart
      .get()
      .then((data) => {
        if (!mounted) {
          return;
        }
        if (data?.items?.length) {
          const withKeys = data.items.map((item) => ({
            ...item,
            key: buildCartKey(item)
          }));
          setItems(withKeys);
        }
        return null;
      })
      .catch(() => {
        // Ignore cart sync failures; user can still use local cart.
      });

    return () => {
      mounted = false;
    };
  }, [user, setItems]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsSyncing(true);
    api.cart
      .sync(items.map(stripCartKey))
      .catch(() => {})
      .finally(() => setIsSyncing(false));
  }, [items, user]);

  const addItem = (item) => {
    setItems((prev) => mergeCartItems(prev, item));
  };

  const updateQuantity = (key, quantity) => {
    const normalized = Math.max(1, Number(quantity) || 1);
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, quantity: normalized } : item
      )
    );
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        isSyncing,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        setItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
