package com.infosys.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.entity.Transaction;
@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

	List<Transaction> findByUsername(String username);

}
