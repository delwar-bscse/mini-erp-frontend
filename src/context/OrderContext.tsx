"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  selling_price: number;
  quantity: number;
}

interface OrderContextType {
  items: OrderItem[];
  note: string;

  addItem: (item: OrderItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setNote: (note: string) => void;
  clearOrder: () => void;

  payload: {
    items: {
      product: string;
      quantity: number;
    }[];
    note: string;
  };
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [note, setNote] = useState("");

  const addItem = (item: OrderItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: item.quantity }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearOrder = () => {
    setItems([]);
    setNote("");
  };

  // Payload for API
  const payload = {
    items: items.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    })),
    note,
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        note,
        addItem,
        removeItem,
        updateQuantity,
        setNote,
        clearOrder,
        payload,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }

  return context;
};