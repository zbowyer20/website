package com.website.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.website.model.BlogPost;

public interface BlogRepository extends Repository<BlogPost, String> {
	void delete(BlogPost deleted);
	
	List<BlogPost> findAll();
	
	Optional<BlogPost> findOne(String id);
	
	BlogPost save(BlogPost saved);
}
