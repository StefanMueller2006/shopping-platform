import React from "react";
import { Layout } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AntdRegistry>
          <Layout style={{ height: "100vh" }}>
            <Header style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Link href={"/"}>Home</Link>
              <Link href={"/products"}>All Products</Link>
            </Header>
            <Content style={{ padding: "0 48px" }}>
              <div
                style={{
                  background: "#F5F5F5",
                  minHeight: 280,
                  padding: 24,
                  borderRadius: 5,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design Created by Ant UED
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
