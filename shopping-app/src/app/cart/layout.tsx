import { ReactNode } from "react";
import { CartProvider } from "@/contexts/cart-context";
import { ProductsProvider } from "@/contexts/product-context";

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsProvider>
      <CartProvider>{children}</CartProvider>
    </ProductsProvider>
  );
};

export default ProductsLayout;
