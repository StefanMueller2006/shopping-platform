package org.bbw.customerservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService service;

    @PostMapping("customer")
    public Customer save(@RequestBody Customer customer) {
        System.out.println(customer.getFirstName());
        return service.save(customer);
    }
}
