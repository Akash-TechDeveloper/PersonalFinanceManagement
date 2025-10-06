package com.infosys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.infosys.entity.Goal;
import com.infosys.service.GoalService;
@Controller
@CrossOrigin(origins= {"*"})
public class GoalController {
	
	@Autowired GoalService goalService;
	@PostMapping("home/goals/add")
	public ResponseEntity<String> addGoal(@RequestBody Goal goal)
	{
		Goal response=goalService.addGoal(goal);
		if(response!=null)
			return new ResponseEntity<>("Goal added Successfully",HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@GetMapping("home/goals")
	public ResponseEntity<List<Goal>> getGoalByUsername(@RequestParam String username)
	{
		List<Goal> response=goalService.getGoalByUsername(username);
		if(!response.isEmpty())
			return new ResponseEntity<>(response,HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
