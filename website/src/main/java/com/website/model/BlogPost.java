package com.website.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class BlogPost {
	@Id
	String id;
	String title;
	String description;
	Date dateCreated;
	//LocalDateTime dateModified;
	
	public BlogPost() {

	}
	
	public BlogPost(Builder builder) {
		this.description = builder.description;
		this.title = builder.title;
		this.dateCreated = builder.dateCreated;
		//this.dateModified = builder.dateModified;
	}
	
	public static Builder getBuilder() {
		return new Builder();
	}
	
	public void update(String title, String description, Date dateCreated) {
		this.title = title;
		this.description = description;
		this.dateCreated = dateCreated;
		//this.dateModified = dateModified;
	}
	
	public static class Builder {
		private String description;
		private String title;
		private Date dateCreated;
		//private LocalDateTime dateModified;
		
		private Builder() {}
		
		public Builder description(String description) {
			this.description = description;
			return this;
		}
		
		public Builder title(String title) {
			this.title = title;
			return this;
		}
		
		public Builder dateCreated(Date dateCreated) {
			this.dateCreated = dateCreated;
			return this;
		}
		
//		public Builder dateModified(LocalDateTime dateModified) {
//			this.dateModified = dateModified;
//			return this;
//		}
		
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
	
	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

//	public LocalDateTime getDateModified() {
//		return dateModified;
//	}
//
//	public void setDateModified(LocalDateTime dateModified) {
//		this.dateModified = dateModified;
//	}
}
