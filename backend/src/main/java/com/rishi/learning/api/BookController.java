package com.rishi.learning.api;

import com.rishi.learning.data.BookRequestData;
import com.rishi.learning.data.BookResponseData;
import com.rishi.learning.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<List<BookResponseData>> getAllBooks(){
        try{
            List<BookResponseData> responseData = bookService.getALlBooks();
            return ResponseEntity.ok(responseData);
        }catch (Exception e){
            log.error("error occurred in get all method",e);
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseData> getById(@PathVariable String id){
        try{
            BookResponseData responseData = bookService.getById(id);
            return ResponseEntity.ok(responseData);
        }catch (Exception e){
            log.error("error occurred in get by id method",e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<BookResponseData> addNewBook(@RequestBody BookRequestData requestData){
        try{
            BookResponseData responseData = bookService.addBook(requestData);
            return ResponseEntity.ok(responseData);
        }catch (Exception e){
            log.error("error occurred in add new book method",e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<BookResponseData> updateBookDetails(@RequestBody BookRequestData requestData, @PathVariable String id){
        try{
            requestData.setId(id);
            BookResponseData responseData = bookService.updateBookDetails(requestData);
            return ResponseEntity.ok(responseData);
        }catch (Exception e){
            log.error("error occurred in update book method",e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id){
        try{
            bookService.deleteById(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            log.error("error occurred in delete by id method",e);
            return ResponseEntity.badRequest().build();
        }

    }
}
