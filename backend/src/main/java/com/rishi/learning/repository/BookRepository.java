package com.rishi.learning.repository;

import com.rishi.learning.model.BookModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;



@Repository
public interface BookRepository extends  JpaRepository<BookModel,Long>, CrudRepository<BookModel,Long>{


}
