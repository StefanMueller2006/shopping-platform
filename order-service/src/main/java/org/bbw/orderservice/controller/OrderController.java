package org.bbw.orderservice.controller;

import org.bbw.orderservice.model.Order;
import org.bbw.orderservice.service.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:8080")
public class OrderController {

    @Autowired
    private KafkaProducer kafkaProducer;

    @PostMapping("/place_order")
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        kafkaProducer.sendMessage("Hello");
        return ResponseEntity.ok("Order for customer with id: " + order.getCustomerId() + " placed.");
    }

    @PostMapping("/{id}/cancel_order")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.ok("Order with id: " + id + " canceled.");
    }
}
