package com.infosys.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.entity.Bill;

@Repository
public interface BillRepo extends JpaRepository<Bill, Integer> {
	public List<Bill> findByUsername(String username);
}