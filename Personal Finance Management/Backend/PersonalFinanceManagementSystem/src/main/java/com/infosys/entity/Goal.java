package com.infosys.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Goal {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int id;
	public String goalName;
	public String goalAmount;
	public String username;
	public Goal() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Goal(int id, String goalName, String goalAmount, String username) {
		super();
		this.id = id;
		this.goalName = goalName;
		this.goalAmount = goalAmount;
		this.username = username;
	}
	public int getId() {
		return id;
	}
	public String getGoalName() {
		return goalName;
	}
	public String getGoalAmount() {
		return goalAmount;
	}
	public String getUsername() {
		return username;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setGoalName(String goalName) {
		this.goalName = goalName;
	}
	public void setGoalAmount(String goalAmount) {
		this.goalAmount = goalAmount;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	@Override
	public String toString() {
		return "Goal [id=" + id + ", goalName=" + goalName + ", goalAmount=" + goalAmount + ", username=" + username
				+ "]";
	}
	
	
	
	
	
}
