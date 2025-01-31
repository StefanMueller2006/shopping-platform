"use client";

import { useProductsContext } from "@/contexts/product-context";
import { Button, Card, Col, Row, Typography } from "antd";
import { useCart } from "@/contexts/cart-context";
import { useCustomersContext } from "@/contexts/customer-context";

const Products = () => {
  const { loggedInCustomer } = useCustomersContext();
  const { products } = useProductsContext();
  const { addProduct } = useCart();

  return (
    <div>
      <Typography.Title level={1}>Products</Typography.Title>
      <Row gutter={16}>
        {products
          .filter((product) => product.isAvailable)
          .map((product) => (
            <Col key={product.id} span={8} style={{ marginBottom: 16 }}>
              <Card title={product.name}>
                <div style={{ display: "block", marginBottom: 16 }}>
                  <Typography style={{ marginBottom: 16 }}>
                    {product.description}
                  </Typography>
                  <Typography.Text strong={true}>
                    ${product.price}
                  </Typography.Text>
                </div>
                <Button
                  type={"primary"}
                  onClick={() =>
                    addProduct(loggedInCustomer?.id || -1, product.id)
                  }
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Products;
