package org.bbw.cartservice.controller;

import org.bbw.cartservice.model.Cart;
import org.bbw.cartservice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository repository;

    // 1. Get cart by customer ID, create if not found
    @GetMapping("/{customerId}")
    public ResponseEntity<Cart> getCartByCustomerId(@PathVariable Long customerId) {
        Cart cart = repository.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomerId(customerId);
                    newCart.setProducts(new HashMap<>());
                    return repository.save(newCart);
                });
        return ResponseEntity.ok(cart);
    }

    // 2. Add +1 quantity of a product
    @PostMapping("/{customerId}/add/{productId}")
    public ResponseEntity<Cart> addProduct(@PathVariable Long customerId, @PathVariable Long productId) {
        Cart cart = repository.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomerId(customerId);
                    newCart.setProducts(new HashMap<>());
                    return repository.save(newCart);
                });

        Map<Long, Long> products = cart.getProducts();
        products.put(productId, products.getOrDefault(productId, 0L) + 1);
        cart.setProducts(products);

        return ResponseEntity.ok(repository.save(cart));
    }

    // 3. Remove -1 quantity of a product (cannot go below 1)
    @PostMapping("/{customerId}/remove/{productId}")
    public ResponseEntity<Cart> removeProduct(@PathVariable Long customerId, @PathVariable Long productId) {
        Optional<Cart> optionalCart = repository.findByCustomerId(customerId);
        if (optionalCart.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cart cart = optionalCart.get();
        Map<Long, Long> products = cart.getProducts();
        if (products.containsKey(productId) ) {
            if(products.get(productId) > 1) {
                products.put(productId, products.get(productId) - 1);
            }
            else {
                products.remove(productId);
            }
        }

        cart.setProducts(products);
        return ResponseEntity.ok(repository.save(cart));
    }

    // 4. Remove all quantity of one product
    @DeleteMapping("/{customerId}/remove/{productId}")
    public ResponseEntity<Cart> removeAllQuantityOfProduct(@PathVariable Long customerId, @PathVariable Long productId) {
        Optional<Cart> optionalCart = repository.findByCustomerId(customerId);
        if (optionalCart.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cart cart = optionalCart.get();
        Map<Long, Long> products = cart.getProducts();
        products.remove(productId);

        cart.setProducts(products);
        return ResponseEntity.ok(repository.save(cart));
    }

    // 5. Remove all products from the cart
    @DeleteMapping("/{customerId}/clear")
    public ResponseEntity<Cart> clearCart(@PathVariable Long customerId) {
        Optional<Cart> optionalCart = repository.findByCustomerId(customerId);
        if (optionalCart.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cart cart = optionalCart.get();
        cart.setProducts(new HashMap<>()); // Empty the map

        return ResponseEntity.ok(repository.save(cart));
    }
}
