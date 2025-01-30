"use client";
import React from "react";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartShopping = () => {
    router.push("/products");
  };
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        width: "50%",
      }}
    >
      <Title level={1}>{"Welcome to your Shopping Dream!"}</Title>
      <img src={"background2.webp"} alt={"Shopping Dream"} width={700} />
      <br />
      <br />
      <Button type="primary" size={"large"} onClick={handleStartShopping}>
        Start Shopping
      </Button>
    </div>
  );
}
