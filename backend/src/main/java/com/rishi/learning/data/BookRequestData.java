package com.rishi.learning.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookRequestData implements Serializable {

    private String id;
    private String name;
    private String author;
    private BigDecimal price;
    private String yearOfPublication;
}
