package com.website.model;

import org.springframework.data.annotation.Id;

public class BlogPost {
	@Id
	String id;
	String title;
	String description;	
	
	public BlogPost() {

	}
	
	public BlogPost(Builder builder) {
		this.description = builder.description;
		this.title = builder.title;
	}
	
	public static Builder getBuilder() {
		return new Builder();
	}
	
	public void update(String title, String description) {
		this.title = title;
		this.description = description;
	}
	
	public static class Builder {
		private String description;
		private String title;
		
		private Builder() {}
		
		public Builder description(String description) {
			this.description = description;
			return this;
		}
		
		public Builder title(String title) {
			this.title = title;
			return this;
		}
		
		public BlogPost build() {
			BlogPost build = new BlogPost(this);
			return build;
		}
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
