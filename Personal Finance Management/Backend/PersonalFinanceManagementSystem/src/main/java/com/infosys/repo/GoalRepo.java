package com.infosys.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.entity.Goal;
@Repository
public interface GoalRepo extends JpaRepository<Goal, Integer> {
	List<Goal> findByUsername(String username);
}
