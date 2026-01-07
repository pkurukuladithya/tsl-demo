import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";
import {
  buildWhatsAppLink,
  buildWhatsAppMessage
} from "../utils/whatsapp.js";

export const useWhatsAppOrder = () => {
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);

  const placeOrder = async ({ items, guest }) => {
    if (!items?.length) {
      throw new Error("Your cart is empty");
    }

    setPlacing(true);
    try {
      if (user) {
        await api.orders.create(items);
      }

      const message = buildWhatsAppMessage({ user, guest, items });
      const link = buildWhatsAppLink(message);
      window.open(link, "_blank", "noopener,noreferrer");
      return true;
    } finally {
      setPlacing(false);
    }
  };

  return { placing, placeOrder };
};
