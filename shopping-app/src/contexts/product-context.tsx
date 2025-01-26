"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import Product from "@/types/product";

export type ProductContextType = {
  products: Product[];
};

const defaultProductContext: ProductContextType = {
  products: [],
};

export const ProductsContext = createContext<ProductContextType>(
  defaultProductContext,
);

const productsUrl = "http://localhost:8080/product-service";

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${productsUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
