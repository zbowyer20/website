package com.website.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.website.repository.StoryDTO;
import com.website.service.StoryService;

@RestController
@RequestMapping("/api/story")
public class StoryController {
	private final StoryService service;
	@Autowired
	private ResourceLoader resourceLoader;
	
	@Autowired
	StoryController(StoryService service) {
		this.service = service;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	StoryDTO create(@RequestBody @Valid StoryDTO story) {
		return service.create(story);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json; charset=UTF-8")
	List<StoryDTO> findAll() {
		return service.findAll();
	}
	
	@RequestMapping(value = "/{name}", method = RequestMethod.GET, produces="application/json; charset=UTF-8")
	ResponseEntity<StoryContainer> getStory(@PathVariable("name") String fileName) {
		try {
			Resource res = resourceLoader.getResource("classpath:public/html/" + fileName + ".html");
			BufferedReader br = new BufferedReader(new InputStreamReader(res.getInputStream()));
			StringBuilder stringBuilder = new StringBuilder();
			String line;
			while ((line = br.readLine()) != null) {
				stringBuilder.append(line);
			}
			br.close();
			return new ResponseEntity<>(new StoryContainer(stringBuilder.toString()), HttpStatus.OK);
		}
		catch (IOException e) {
			System.out.println("error: " + e.getMessage());
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public class StoryContainer {
		private String story;
		
		public String getStory() {
			return story;
		}

		public void setStory(String story) {
			this.story = story;
		}

		public StoryContainer(String story) {
			this.story = story;
		}
	}
	
	
}
