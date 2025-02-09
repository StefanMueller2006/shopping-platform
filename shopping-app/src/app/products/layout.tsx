import { ProductsProvider } from "@/contexts/product-context";
import { ReactNode } from "react";
import { CartProvider } from "@/contexts/cart-context";

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsProvider>
      <CartProvider>{children}</CartProvider>
    </ProductsProvider>
  );
};

export default ProductsLayout;
