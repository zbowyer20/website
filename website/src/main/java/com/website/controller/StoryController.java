package com.website.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.website.repository.BlogPostDTO;
import com.website.repository.StoryDTO;
import com.website.service.StoryService;

@RestController
@RequestMapping("/api/story")
public class StoryController {
	private final StoryService service;
	
	@Autowired
	StoryController(StoryService service) {
		this.service = service;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	StoryDTO create(@RequestBody @Valid StoryDTO story) {
		System.out.println(story);
		return service.create(story);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	List<StoryDTO> findAll() {
		return service.findAll();
	}
}
