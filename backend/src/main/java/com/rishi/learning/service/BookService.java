package com.rishi.learning.service;

import com.rishi.learning.data.BookRequestData;
import com.rishi.learning.data.BookResponseData;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookService {

    List<BookResponseData> getALlBooks();

    BookResponseData getById(String id) throws Exception;

    BookResponseData addBook(BookRequestData requestData);

    BookResponseData updateBookDetails(BookRequestData requestData) throws Exception;

    void deleteById(String id);
}
