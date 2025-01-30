"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Customer } from "@/types/customer";

export type CustomersContextType = {
  allCustomers: Customer[];
  loggedInCustomer: Customer | null;
  setLoggedInCustomer: (customer: Customer) => void;
};

const defaultCustomersContext: CustomersContextType = {
  allCustomers: [],
  loggedInCustomer: null,
  setLoggedInCustomer: () => {},
};

export const CustomersContext = createContext<CustomersContextType>(
  defaultCustomersContext,
);

const customersUrl = "http://localhost:8080/customer-service";

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [loggedInCustomer, setLoggedInCustomer] = useState<Customer | null>(
    null,
  );

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${customersUrl}/customers`);
      setAllCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomersContext.Provider
      value={{ allCustomers, loggedInCustomer, setLoggedInCustomer }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomersContext = () => useContext(CustomersContext);
