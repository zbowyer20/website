package com.website.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class Story {
	@Id
	String id;
	String title;
	String content;
	String img;
	Date timeSetting;
	
	public Story() {

	}
	
	public Story(Builder builder) {
		this.content = builder.content;
		this.title = builder.title;
		this.img = builder.img;
		this.timeSetting = builder.timeSetting;
	}
	
	public static Builder getBuilder() {
		return new Builder();
	}
	
	public void update(String title, String content, String img, Date timeSetting) {
		this.title = title;
		this.content = content;
		this.img = img;
		this.timeSetting = timeSetting;
	}
	
	public static class Builder {
		private String content;
		private String title;
		private String img;
		private Date timeSetting;
		
		private Builder() {}
		
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

}
