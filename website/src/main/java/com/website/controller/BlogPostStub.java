package com.website.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.website.model.BlogPost;

public class BlogPostStub {
	private static Map<Long, BlogPost> posts = new HashMap<Long, BlogPost>();
	private static Long idIndex = 3L;
	
	static {
		BlogPost blog = new BlogPost(1L, "Test Two", "Content One");
		posts.put(1L, blog);
	}
	
	public static List<BlogPost> list() {
		return new ArrayList<BlogPost>(posts.values());
	}
}
