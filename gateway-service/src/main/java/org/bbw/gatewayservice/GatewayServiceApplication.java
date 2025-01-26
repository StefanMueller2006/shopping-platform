package org.bbw.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

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
                        .path("/products")
                        .filters(f -> f.circuitBreaker(config ->
                                config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://localhost:8081"))
                .route(p -> p
                        .path("/customer-service/**")  // Match all paths under /customer-service
                        .filters(f -> f
                                .rewritePath("/customer-service/(?<segment>.*)", "/${segment}") // Remove `/customer-service` and forward the remaining path
                                .circuitBreaker(config ->
                                        config.setName("mycmd").setFallbackUri("forward:/fallback")))
                        .uri("http://localhost:8082")) // Target service
                .build();
    }

    @RequestMapping("/fallback")
    public Mono<String> fallback() {
        return Mono.just("fallback");
    }
}
