package com.bowyerville.website;

import java.nio.charset.Charset;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

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
	
	@Before
	public void setUp() {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
//		story1 = Story.getBuilder().fileName("test-1").character("Tester").title("Test I").content("This is the first test").img("images/test.png").timeSetting(new Date("02-02-2016 09:00")).next("test-2").build();
//		story2 = Story.getBuilder().fileName("test-2").character("Tester 2").title("Test II").content("This is the second test").img("images/test.png").timeSetting(new Date("02-02-2016 10:00")).next("test-3").build();
//		story3 = Story.getBuilder().fileName("test-3").character("Tester 3").title("Test III").content("This is the third test").img("images/test.png").timeSetting(new Date("02-02-2016 11:00")).next("test-1").build();
//	
//		//repository.deleteAll();
//		repository.save(story1);
//		repository.save(story2);
//		repository.save(story3);	
	}
	
	@Test
	public void getStory() throws Exception {
		mockMvc.perform(get("http://localhost:8090/api/story/victoria-1"))
				.andExpect(status().isOk());
	}
}
