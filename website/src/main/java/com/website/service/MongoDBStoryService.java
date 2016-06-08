package com.website.service;

import static java.util.stream.Collectors.toList;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.website.model.Story;
import com.website.repository.StoryDTO;
import com.website.repository.StoryRepository;

@Service
public class MongoDBStoryService implements StoryService {
	private final StoryRepository repository;
	
	@Autowired
	MongoDBStoryService(StoryRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public StoryDTO create(StoryDTO story) {
		Story persisted = Story.getBuilder().character(story.getCharacter()).title(story.getTitle()).content(story.getContent()).img(story.getImg()).timeSetting(story.getTimeSetting()).build();
		persisted = repository.save(persisted);
		return convertToDTO(persisted);
	}
	
	@Override
	public StoryDTO delete(String id) {
		Story deleted = findStoryById(id);
		repository.delete(deleted);
		return convertToDTO(deleted);
	}
	
	@Override
	public List<StoryDTO> findAll() {
		List<Story> StoryEntries = repository.findAll();
		// sort Story posts from newest - oldest
		Collections.sort(StoryEntries, new Comparator<Story>() {
			public int compare(Story o1, Story o2) {
				return o2.getTimeSetting().compareTo(o1.getTimeSetting());
			}
		});
		return convertToDTOs(StoryEntries);
	}
	
	private List<StoryDTO> convertToDTOs(List<Story> models) {
		return models.stream()
				.map(this::convertToDTO)
				.collect(toList());
	}
	
	@Override
	public StoryDTO findById(String id) {
		Story found = findStoryById(id);
		return convertToDTO(found);
	}
	
	@Override
	public StoryDTO update(StoryDTO Story) {
		Story updated = findStoryById(Story.getId());
		updated.update(Story.getCharacter(), Story.getTitle(), Story.getContent(), Story.getImg(), Story.getTimeSetting());
		updated = repository.save(updated);
		return convertToDTO(updated);
	}
	
	private Story findStoryById(String id) {
		Optional<Story> result = repository.findOne(id);
        return result.get();
	}
	
	private StoryDTO convertToDTO(Story model) {
		StoryDTO dto = new StoryDTO();
		dto.setId(model.getId());
		dto.setCharacter(model.getCharacter());
		dto.setTitle(model.getTitle());
		dto.setContent(model.getContent());
		dto.setImg(model.getImg());
		dto.setTimeSetting(model.getTimeSetting());
		//dto.setDateModified(model.getDateModified());
		
		return dto;
	}
}
