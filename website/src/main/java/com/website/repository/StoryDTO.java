package com.website.repository;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class StoryDTO {
	private String id;
	private String content;
	private String title;
	private String img;
	@JsonFormat(pattern="dd-MM-yyyy HH.mm")
	private Date timeSetting;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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
