package org.bbw.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }

    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/product-service/**")
                        .filters(f -> f
                                .rewritePath("/product-service/(?<segment>.*)", "/${segment}")
                                .circuitBreaker(config ->
                                        config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://localhost:8081"))
                .route(p -> p
                        .path("/customer-service/**")
                        .filters(f -> f
                                .rewritePath("/customer-service/(?<segment>.*)", "/${segment}")
                                .circuitBreaker(config ->
                                        config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://localhost:8082"))
                .route(p -> p
                        .path("/cart-service/**")
                        .filters(f -> f
                                .rewritePath("/cart-service/(?<segment>.*)", "/${segment}")
                                .circuitBreaker(config ->
                                        config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://localhost:8083"))
                .route(p -> p
                        .path("/order-service/**")
                        .filters(f -> f
                                .rewritePath("/order-service/(?<segment>.*)", "/${segment}")
                                .circuitBreaker(config ->
                                        config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://localhost:8084"))
                .build();
    }

    @RequestMapping("/fallback")
    public ResponseEntity<Void> fallback() {
        return ResponseEntity.status(503).build();
    }
}
