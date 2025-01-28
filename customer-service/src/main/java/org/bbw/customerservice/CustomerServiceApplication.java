package org.bbw.customerservice;

import org.bbw.customerservice.model.Customer;
import org.bbw.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(CustomerRepository repository) {
        return (args) -> {
            Customer customer1 = new Customer("Müller", "Stefan", "stefmu3@gmail.com");
            Customer customer2 = new Customer("Rhyner", "Aaron", "aaronrhyner@hotmail.com");
            Customer customer3 = new Customer("Ninivaggi", "Mattia", "m.nini@bbw.ch");

            repository.save(customer1);
            repository.save(customer2);
            repository.save(customer3);
        };
    }
}
