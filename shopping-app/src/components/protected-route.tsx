"use client";
import { useCustomersContext } from "@/contexts/customer-context";
import { ReactNode, useState } from "react";
import { Button, Select, Spin, Typography } from "antd";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { allCustomers, loggedInCustomer, setLoggedInCustomer } =
    useCustomersContext();
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(0);

  const onContinue = () => {
    setLoggedInCustomer(allCustomers[selectedCustomerIndex]);
  };

  if (!loggedInCustomer) {
    return (
      <div style={{ padding: 16 }}>
        <Typography.Title level={2}>
          Please select a customer to continue
        </Typography.Title>
        {!allCustomers || allCustomers.length === 0 ? (
          <Spin />
        ) : (
          <>
            <Select
              value={selectedCustomerIndex}
              style={{ width: 120, display: "block", marginBottom: 16 }}
              onChange={(e) => setSelectedCustomerIndex(e)}
              options={allCustomers.map((customer, index) => {
                return { value: index, label: customer.firstName };
              })}
            />
            <Button type={"primary"} onClick={onContinue}>
              Continue
            </Button>
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
