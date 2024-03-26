package com.rishi.learning.mapper;

import com.rishi.learning.data.BookRequestData;
import com.rishi.learning.model.BookModel;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class BookReverseMapper {

    public BookModel bookReverseMapper(BookModel bookModel , BookRequestData data){
        BookModel model = null;
        model = Objects.requireNonNullElseGet(bookModel, BookModel::new);
        model.setName(data.getName());
        model.setAuthor(data.getAuthor());
        model.setPrice(data.getPrice());
        model.setYearOfPublication(data.getYearOfPublication());
        return model;
    }
}
