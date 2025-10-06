package com.infosys.service;

import java.util.List;

import com.infosys.entity.Goal;

public interface GoalService {
	public Goal addGoal(Goal goal);
	public List<Goal> getGoalByUsername(String username);
}
