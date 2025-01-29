package org.bbw.orderservice.controller;

import org.bbw.orderservice.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:8080")
public class OrderController {

    @PostMapping("/place_order")
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok("Order for customer with id: " + order.getCustomerId() + " placed.");
    }

    @PostMapping("/{id}/cancel_order")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.ok("Order with id: " + id + " canceled.");
    }
}
