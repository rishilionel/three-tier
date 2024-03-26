package com.rishi.learning.service.impl;

import com.rishi.learning.data.BookRequestData;
import com.rishi.learning.data.BookResponseData;
import com.rishi.learning.mapper.BookMapper;
import com.rishi.learning.mapper.BookReverseMapper;
import com.rishi.learning.model.BookModel;
import com.rishi.learning.repository.BookRepository;
import com.rishi.learning.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private BookReverseMapper bookReverseMapper;

    @Override
    public List<BookResponseData> getALlBooks() {
        List<BookModel> bookModelList = bookRepository.findAll();
        return bookModelList.stream().map(i -> bookMapper.bookMapper(i)).toList();
    }

    @Override
    public BookResponseData getById(String id) throws Exception {
        BookModel bookModel = bookRepository.findById(Long.valueOf(id)).orElseThrow(() -> new Exception("no book found for the given id"));
        return bookMapper.bookMapper(bookModel);
    }

    @Override
    public BookResponseData addBook(BookRequestData requestData) {
        BookModel bookModel = bookReverseMapper.bookReverseMapper(null,requestData);
        BookModel respBookModel = bookRepository.save(bookModel);
        return bookMapper.bookMapper(respBookModel);
    }

    @Override
    public BookResponseData updateBookDetails(BookRequestData requestData) throws Exception {
        BookModel bookModel = bookRepository.findById(Long.valueOf(requestData.getId())).orElseThrow(() -> new Exception("no book found for the given id"));
        BookModel updatedBookModel = bookReverseMapper.bookReverseMapper(bookModel,requestData);
        BookModel respBookModel = bookRepository.save(updatedBookModel);
        return bookMapper.bookMapper(respBookModel);
    }

    @Override
    public void deleteById(String id) {
        bookRepository.deleteById(Long.valueOf(id));
    }
}
