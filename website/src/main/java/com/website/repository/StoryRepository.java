package com.website.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.website.model.Story;

public interface StoryRepository extends Repository<Story, String> {
	void delete(Story deleted);
	
	List<Story> findAll();
	
	Optional<Story> findOne(String id);
	
	Story save(Story saved);
}
