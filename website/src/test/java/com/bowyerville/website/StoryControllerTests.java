package com.bowyerville.website;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.nio.charset.Charset;
import java.util.Date;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.website.App;
import com.website.model.Story;
import com.website.repository.StoryRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = App.class)
@WebAppConfiguration
public class StoryControllerTests {
	
	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(),
			Charset.forName("utf8"));
	
	private MockMvc mockMvc;
	
	@Autowired
	StoryRepository repository;
	
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	Story story1;
	Story story2;
	Story story3;
	Story story4;
	
	@Before
	public void setUp() {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
		story1 = Story.getBuilder().fileName("test-1").character("Tester").title("Test I").content("This is the first test").img("images/test.png").timeSetting(new Date(2016, 1, 2, 9, 0)).next("test-2").build();
		story2 = Story.getBuilder().fileName("test-2").character("Tester 2").title("Test II").content("This is the second test").img("images/test.png").timeSetting(new Date(2016, 1, 2, 10, 0)).next("test-3").build();
		story3 = Story.getBuilder().fileName("test-3").character("Tester 3").title("Test III").content("This is the third test").img("images/test.png").timeSetting(new Date(2016, 1, 2, 11, 0)).next("test-1").build();
		story4 = Story.getBuilder().fileName("test-4").character("Tester 4").title("Test IV").content("This is the fourth test").img("images/test.png").timeSetting(new Date(2016, 1, 2, 12, 0)).next("test-1").build();
		
		//repository.deleteAll();
		repository.save(story1);
		repository.save(story2);
		repository.save(story3);	
	}
	
	@After
	public void deleteStories() {
		repository.delete(story1);
		repository.delete(story2);
		repository.delete(story3);
		repository.delete(story4);
	}
	
	@Test
	public void getStory() throws Exception {
		mockMvc.perform(get("http://localhost:8091/api/story/test-1"))
				.andExpect(status().isOk());
	}
	
	@Test
	public void createStory() throws Exception {
		mockMvc.perform(post("http://localhost:8091/api/story/")
				.content(convertToJson(story4))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
	}
	
	@Test
	public void getStories() throws Exception {
		mockMvc.perform(get("http://localhost:8091/api/story/"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
	}
	
	public String convertToJson(Object o) {
		try {
			ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String json = ow.writeValueAsString(o);
			return json;
		}
		catch (Exception e) {
			System.out.println("Error");
			return null;
		}
	}
	
	
}
