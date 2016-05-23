package com.website.service;

import java.util.List;

import com.website.repository.BlogPostDTO;

public interface BlogService {
	public BlogPostDTO create(BlogPostDTO blogPost);

	BlogPostDTO delete(String id);
	
	List<BlogPostDTO> findAll();
	
	BlogPostDTO findById(String id);
	
	BlogPostDTO update(BlogPostDTO blogPost);
}
