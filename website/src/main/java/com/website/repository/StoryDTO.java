package com.website.repository;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class StoryDTO {
	private String id;
	private String next;
	private String character;
	private String fileName;
	private String content;
	private String title;
	private String img;
	@JsonFormat(pattern="MM-dd-yyyy HH:mm")
	private Date timeSetting;
	private String youtubeId;
	private boolean hiddenDate;
	private String teaser;
	private String type;

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
	
	public String getYoutubeId() {
		return youtubeId;
	}

	public void setYoutubeId(String youtubeId) {
		this.youtubeId = youtubeId;
	}

	public boolean isHiddenDate() {
		return hiddenDate;
	}

	public void setHiddenDate(boolean hiddenDate) {
		this.hiddenDate = hiddenDate;
	}

	public String getTeaser() {
		return teaser;
	}

	public void setTeaser(String teaser) {
		this.teaser = teaser;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
