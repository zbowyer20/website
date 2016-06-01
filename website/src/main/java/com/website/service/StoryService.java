package com.website.service;

import java.util.List;

import com.website.repository.StoryDTO;

public interface StoryService {
	public StoryDTO create(StoryDTO story);

	StoryDTO delete(String id);
	
	List<StoryDTO> findAll();
	
	StoryDTO findById(String id);
	
	StoryDTO update(StoryDTO blogPost);
}
