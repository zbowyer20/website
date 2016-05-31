package com.website.service;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.website.model.BlogPost;
import com.website.repository.BlogPostDTO;
import com.website.repository.BlogRepository;

@Service
public class MongoDBBlogService implements BlogService {
	private final BlogRepository repository;
	
	@Autowired
	MongoDBBlogService(BlogRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public BlogPostDTO create(BlogPostDTO blogPost) {
		BlogPost persisted = BlogPost.getBuilder().title(blogPost.getTitle()).description(blogPost.getDescription()).dateCreated(blogPost.getDateCreated()).build();
		persisted = repository.save(persisted);
		return convertToDTO(persisted);
	}
	
	@Override
	public BlogPostDTO delete(String id) {
		BlogPost deleted = findBlogPostById(id);
		repository.delete(deleted);
		return convertToDTO(deleted);
	}
	
	@Override
	public List<BlogPostDTO> findAll() {
		List<BlogPost> blogPostEntries = repository.findAll();
		return convertToDTOs(blogPostEntries);
	}
	
	private List<BlogPostDTO> convertToDTOs(List<BlogPost> models) {
		return models.stream()
				.map(this::convertToDTO)
				.collect(toList());
	}
	
	@Override
	public BlogPostDTO findById(String id) {
		BlogPost found = findBlogPostById(id);
		return convertToDTO(found);
	}
	
	@Override
	public BlogPostDTO update(BlogPostDTO blogPost) {
		BlogPost updated = findBlogPostById(blogPost.getId());
		updated.update(blogPost.getTitle(), blogPost.getDescription(), blogPost.getDateCreated());
		updated = repository.save(updated);
		return convertToDTO(updated);
	}
	
	private BlogPost findBlogPostById(String id) {
		Optional<BlogPost> result = repository.findOne(id);
        return result.get();
	}
	
	private BlogPostDTO convertToDTO(BlogPost model) {
		BlogPostDTO dto = new BlogPostDTO();
		dto.setId(model.getId());
		dto.setTitle(model.getTitle());
		dto.setDescription(model.getDescription());
		dto.setDateCreated(model.getDateCreated());
		//dto.setDateModified(model.getDateModified());
		
		return dto;
	}
}
