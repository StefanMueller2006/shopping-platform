package org.bbw.orderservice.model;

import java.util.Map;

public class Order {
    private Long id;

    private Long customerId;

    private Map<Long, Long> products; // productId - quantity

    public Order(Long id, Long customerId, Map<Long, Long> products) {
        this.id = id;
        this.customerId = customerId;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Map<Long, Long> getProducts() {
        return products;
    }

    public void setProducts(Map<Long, Long> products) {
        this.products = products;
    }
}
