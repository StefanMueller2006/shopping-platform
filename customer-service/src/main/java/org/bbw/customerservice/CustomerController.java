package org.bbw.customerservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class CustomerController {
    @Autowired
    private CustomerService service;

    @PostMapping("customers")
    public Customer save(@RequestBody Customer customer) {
        System.out.println(customer.getFirstName());
        return service.save(customer);
    }
}
