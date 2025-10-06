package com.infosys.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.entity.Notification;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Integer> {
	List<Notification> findByUsername(String username);
	void deleteByUsername(String username);
}
