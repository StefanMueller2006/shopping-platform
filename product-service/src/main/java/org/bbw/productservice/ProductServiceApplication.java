package org.bbw.productservice;

import org.bbw.productservice.model.Product;
import org.bbw.productservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(ProductRepository repository) {
        return (args) -> {
            Product product1 = new Product(null, "Smartphone", 699.99, "A high-end smartphone with a 6.5-inch display, 128GB storage, and a 12MP camera.", 150, "Electronics", true, null, null);
            Product product2 = new Product(null, "Laptop", 1199.99, "A powerful laptop with an Intel i7 processor, 16GB RAM, and 512GB SSD.", 200, "Computers", true, null, null);
            Product product3 = new Product(null, "Headphones", 199.99, "Wireless over-ear headphones with noise cancellation.", 50, "Accessories", true, null, null);
            Product product4 = new Product(null, "Smartwatch", 249.99, "A smartwatch with health tracking features and customizable watch faces.", 100, "Electronics", true, null, null);
            Product product5 = new Product(null, "Tablet", 499.99, "A 10-inch tablet with 64GB storage, perfect for browsing and media consumption.", 80, "Electronics", true, null, null);

            repository.save(product1);
            repository.save(product2);
            repository.save(product3);
            repository.save(product4);
            repository.save(product5);
        };
    }

}
