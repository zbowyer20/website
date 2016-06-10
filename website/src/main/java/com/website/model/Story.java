package com.website.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class Story {
	@Id
	String id;
	String fileName;
	String character;
	String title;
	String content;
	String img;
	Date timeSetting;
	String next;

	public Story() {

	}
	
	public Story(Builder builder) {
		this.fileName = builder.fileName;
		this.content = builder.content;
		this.character = builder.character;
		this.title = builder.title;
		this.img = builder.img;
		this.timeSetting = builder.timeSetting;
		this.next = builder.next;
	}
	
	public static Builder getBuilder() {
		return new Builder();
	}
	
	public void update(String fileName, String character, String title, String content, String img, Date timeSetting, String next) {
		this.fileName = fileName;
		this.character = character;
		this.title = title;
		this.content = content;
		this.img = img;
		this.timeSetting = timeSetting;
		this.next = next;
	}
	
	public static class Builder {
		private String fileName;
		private String character;
		private String content;
		private String title;
		private String img;
		private Date timeSetting;
		private String next;
		
		private Builder() {}
		
		public Builder fileName(String fileName) {
			this.fileName = fileName;
			return this;
		}
		
		public Builder character(String character) {
			this.character = character;
			return this;
		}
		
		public Builder content(String content) {
			this.content = content;
			return this;
		}
		
		public Builder title(String title) {
			this.title = title;
			return this;
		}
		
		public Builder img(String img) {
			this.img = img;
			return this;
		}
		
		public Builder timeSetting(Date timeSetting) {
			this.timeSetting = timeSetting;
			return this;
		}
		
		public Builder next(String next) {
			this.next = next;
			return this;
		}
		
		public Story build() {
			Story build = new Story(this);
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getTimeSetting() {
		return timeSetting;
	}

	public void setTimeSetting(Date timeSetting) {
		this.timeSetting = timeSetting;
	}
	
	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}
	
	public String getCharacter() {
		return character;
	}

	public void setCharacter(String character) {
		this.character = character;
	}
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	
	public String getNext() {
		return next;
	}

	public void setNext(String next) {
		this.next = next;
	}

}
