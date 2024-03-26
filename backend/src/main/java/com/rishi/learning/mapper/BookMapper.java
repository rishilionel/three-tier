package com.rishi.learning.mapper;

import com.rishi.learning.data.BookResponseData;
import com.rishi.learning.model.BookModel;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    public BookResponseData bookMapper(BookModel model){
        BookResponseData responseData = new BookResponseData();
        responseData.setId(String.valueOf(model.getId()));
        responseData.setName(model.getName());
        responseData.setAuthor(model.getAuthor());
        responseData.setPrice(model.getPrice());
        responseData.setYearOfPublication(model.getYearOfPublication());
        return responseData;
    }
}
