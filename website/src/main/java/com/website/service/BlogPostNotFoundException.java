package com.website.service;

public class BlogPostNotFoundException extends Exception {
	public BlogPostNotFoundException(String id) {
		System.out.println("Blog Post Not Found: " + id);
	}
}
