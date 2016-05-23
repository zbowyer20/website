package com.website.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.website.repository.BlogPostDTO;
import com.website.service.BlogPostNotFoundException;
import com.website.service.BlogService;

@RestController
@RequestMapping("/api/v1")
public class BlogPostController {
	
	private final BlogService service;
	
	@Autowired
	BlogPostController(BlogService service) {
		this.service = service;
	}
	
	@RequestMapping(value = "/blogs", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	BlogPostDTO create(@RequestBody @Valid BlogPostDTO blogPost) {
		System.out.println(blogPost);
		return service.create(blogPost);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	BlogPostDTO delete(@PathVariable("id") String id) {
		return service.delete(id);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	List<BlogPostDTO> findAll() {
		return service.findAll();
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	BlogPostDTO findById(@PathVariable("id") String id) {
		return service.findById(id);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PUT)
	BlogPostDTO update(@RequestBody @Valid BlogPostDTO blogPost) {
		return service.update(blogPost);
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public void handleBlogPostNotFound(BlogPostNotFoundException ex) {
		
	}
	
}
