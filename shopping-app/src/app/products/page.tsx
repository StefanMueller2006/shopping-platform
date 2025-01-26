"use client";

import { useProductsContext } from "@/contexts/product-context";
import { Card, Col, Row, Typography } from "antd";

const Products = () => {
  const { products } = useProductsContext();
  return (
    <div>
      <h1>Products</h1>
      <Row gutter={16}>
        {products
          .filter((product) => product.isAvailable)
          .map((product) => (
            <Col key={product.id} span={8} style={{ marginBottom: 16 }}>
              <Card title={product.name}>
                <Typography style={{ marginBottom: 16 }}>
                  {product.description}
                </Typography>
                <Typography.Text strong={true}>
                  ${product.price}
                </Typography.Text>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Products;
