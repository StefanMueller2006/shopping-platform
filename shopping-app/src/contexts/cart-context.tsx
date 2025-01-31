"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";

interface Cart {
  customerId: number;
  products: Record<number, number>; // productId -> quantity
}

interface CartContextType {
  cart: Cart | null;
  fetchCart: (customerId: number) => Promise<void>;
  addProduct: (customerId: number, productId: number) => Promise<void>;
  removeProduct: (customerId: number, productId: number) => Promise<void>;
  removeAllOfProduct: (customerId: number, productId: number) => Promise<void>;
  clearCart: (customerId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const API_URL = "http://localhost:8083/carts";

  const fetchCart = useCallback(async (customerId: number) => {
    try {
      const response = await axios.get<Cart>(`${API_URL}/${customerId}`);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []);

  const addProduct = async (customerId: number, productId: number) => {
    try {
      const response = await axios.post<Cart>(
        `${API_URL}/${customerId}/add/${productId}`,
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const removeProduct = async (customerId: number, productId: number) => {
    try {
      const response = await axios.post<Cart>(
        `${API_URL}/${customerId}/remove/${productId}`,
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const removeAllOfProduct = async (customerId: number, productId: number) => {
    try {
      const response = await axios.delete<Cart>(
        `${API_URL}/${customerId}/remove/${productId}`,
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error removing all of product:", error);
    }
  };

  const clearCart = async (customerId: number) => {
    try {
      const response = await axios.delete<Cart>(
        `${API_URL}/${customerId}/clear`,
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addProduct,
        removeProduct,
        removeAllOfProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
