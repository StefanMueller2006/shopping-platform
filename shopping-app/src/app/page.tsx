"use client";
import React from "react";
import { Button, List, Typography } from "antd";
import Title from "antd/es/typography/Title";

export default function Home() {
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
      <Button type="primary" size={"large"}>
        Start Shopping
      </Button>
    </div>
  );
}
