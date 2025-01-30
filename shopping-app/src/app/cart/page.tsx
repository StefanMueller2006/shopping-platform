"use client";
import { useCart } from "@/contexts/cart-context";
import { useCallback, useEffect, useState } from "react";
import { useCustomersContext } from "@/contexts/customer-context";
import { Button, Table, TableProps } from "antd";
import { useProductsContext } from "@/contexts/product-context";

type ProductRow = {
  key: string;
  name: string;
  amount: number;
  price: string;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
};

const Cart = () => {
  const [data, setData] = useState<ProductRow[]>([]);

  const { loggedInCustomer } = useCustomersContext();
  const {
    cart,
    fetchCart,
    addProduct,
    removeProduct,
    removeAllOfProduct,
    clearCart,
  } = useCart();
  const { products } = useProductsContext();

  const handleAddProduct = useCallback(
    (productId: number) => {
      if (loggedInCustomer) {
        addProduct(loggedInCustomer.id, productId);
      }
    },
    [addProduct, loggedInCustomer],
  );

  const handleRemoveProduct = useCallback(
    (productId: number) => {
      if (loggedInCustomer) {
        removeProduct(loggedInCustomer.id, productId);
      }
    },
    [loggedInCustomer, removeProduct],
  );

  const handleRemoveAllOfProduct = useCallback(
    (productId: number) => {
      if (loggedInCustomer) {
        removeAllOfProduct(loggedInCustomer.id, productId);
      }
    },
    [loggedInCustomer, removeAllOfProduct],
  );

  useEffect(() => {
    if (loggedInCustomer) {
      fetchCart(loggedInCustomer.id);
    }
  }, [fetchCart, loggedInCustomer]);

  useEffect(() => {
    if (cart?.products) {
      const data: ProductRow[] = [];
      Object.entries(cart?.products).map(([productId, quantity]) => {
        const product = products.find((p) => p.id === +productId);
        if (product) {
          data.push({
            key: productId,
            name: product.name,
            amount: quantity,
            price: "$" + Math.round(product.price * quantity * 1000) / 1000,
            remove: () => handleRemoveProduct(product.id),
            add: () => handleAddProduct(product.id),
            removeAll: () => handleRemoveAllOfProduct(product.id),
          });
        }
      });
      setData(data);
    }
  }, [
    cart?.products,
    handleAddProduct,
    handleRemoveAllOfProduct,
    handleRemoveProduct,
    products,
  ]);

  const columns: TableProps<ProductRow>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
      render: (e) => <Button onClick={e}>-</Button>,
    },
    {
      title: "Add",
      dataIndex: "add",
      key: "add",
      render: (e) => <Button onClick={e}>+</Button>,
    },
    {
      title: "Remove All",
      dataIndex: "removeAll",
      key: "removeAll",
      render: (e) => <Button onClick={e}>Remove All</Button>,
    },
  ];

  return (
    <div>
      <Table<ProductRow>
        columns={columns}
        dataSource={data}
        style={{ marginBottom: 4 }}
      />
      <Button
        danger={true}
        onClick={() => clearCart(loggedInCustomer?.id || -1)}
        style={{ display: "block", marginBottom: 16 }}
      >
        Clear Cart
      </Button>
      <Button
        type={"primary"}
        disabled={
          (cart?.products ? Object.entries(cart.products).length : 0) === 0
        }
        onClick={() => {
          alert("Yay you bought stuff!");
        }}
      >
        Buy
      </Button>
    </div>
  );
};

export default Cart;
