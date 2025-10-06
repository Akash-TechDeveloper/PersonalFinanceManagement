package com.infosys.service;

import java.util.List;

import com.infosys.entity.Transaction;

public interface TransactionService {

	public Transaction addTransaction(Transaction transaction);
	public List<Transaction> showUserTransaction(String username);
}
