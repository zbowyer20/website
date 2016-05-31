package com.website.repository;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BlogPostDTO {
	private String id;
	private String description;
	private String title;
	@JsonFormat(pattern="dd-MM-yyyy HH.mm")
	private Date dateCreated;
	//@DateTimeFormat
	//private LocalDateTime dateModified;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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
