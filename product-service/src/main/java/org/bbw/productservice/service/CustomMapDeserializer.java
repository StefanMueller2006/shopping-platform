package org.bbw.productservice.service;

import org.apache.kafka.common.serialization.Deserializer;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class CustomMapDeserializer implements Deserializer<Map<Long, Long>> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Map<Long, Long> deserialize(String topic, byte[] data) {
        try {
            // Deserialize the byte array into a Map with String keys and Long values
            Map<String, Long> stringMap = objectMapper.readValue(data, Map.class);

            // Convert the Map to Map<Long, Long>
            Map<Long, Long> resultMap = new java.util.HashMap<>();
            for (Map.Entry<String, Long> entry : stringMap.entrySet()) {
                // Convert key to Long explicitly, avoiding ClassCastException
                resultMap.put(Long.valueOf(entry.getKey()), entry.getValue());
            }
            return resultMap;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void close() {
        // No resources to close for this deserializer
    }
}
