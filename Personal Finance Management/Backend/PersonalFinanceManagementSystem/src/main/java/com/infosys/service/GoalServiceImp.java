package com.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.entity.Goal;
import com.infosys.repo.GoalRepo;
@Service
public class GoalServiceImp implements GoalService {
	@Autowired GoalRepo goalRepo;
	public Goal addGoal(Goal goal) {
		return goalRepo.save(goal);
	}
	public List<Goal> getGoalByUsername(String username)
	{
		return goalRepo.findByUsername(username);
	}
}
