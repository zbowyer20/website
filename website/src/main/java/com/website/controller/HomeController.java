package com.website.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.website.model.BlogPost;

@RestController
public class HomeController {
	
	@RequestMapping("/")
	public String home() {
		return "Hello World";
	}
	
	@RequestMapping(value="blog", method = RequestMethod.GET)
	public List<BlogPost> list() {
		return BlogPostStub.list();
	}
	
}
