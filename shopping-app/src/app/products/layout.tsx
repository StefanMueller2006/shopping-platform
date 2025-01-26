import { ProductsProvider } from "@/contexts/product-context";
import { ReactNode } from "react";

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

export default ProductsLayout;
