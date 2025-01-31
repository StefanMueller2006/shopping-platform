package org.bbw.productservice.service;

import org.bbw.productservice.controller.ProductController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KafkaConsumer {

    @Autowired
    ProductController controller;

    /*
    Does not work unfortunately :(
    @KafkaListener(topics = "my-topic", groupId = "my-consumer-group")
    public void listen(Map<Long, Long> products) {
        products.forEach((aLong, aLong2) -> controller.removeProducts(aLong, aLong2));
        System.out.println("Received message: " + products);
    }
    */

    @KafkaListener(topics = "my-topic", groupId = "my-consumer-group")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }
}
