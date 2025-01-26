"use client";

import { useProductsContext } from "@/contexts/product-context";

const Products = () => {
  const { products } = useProductsContext();
  return (
    <div>
      <h1>Products</h1>
      <p>{JSON.stringify(products)}</p>
    </div>
  );
};

export default Products;
