package com.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.entity.Transaction;
import com.infosys.repo.TransactionRepo;

@Service
public class TransactionServiceImp implements TransactionService{
	
	@Autowired TransactionRepo tranRepo;
	@Override
	public Transaction addTransaction(Transaction transaction) {
		return tranRepo.save(transaction);
	}
	@Override
	public List<Transaction> showUserTransaction(String username){
		return tranRepo.findByUsername(username);
	}
}
