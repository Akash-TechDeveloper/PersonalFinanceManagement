package com.infosys.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int id;
	public String goal;
	public String accountNumber;
	public String username;
	public String transactionType;
	public String creditOrDebit;
	public String date;
	public int amount;
	
	
	// Public Default Constructor
	
	public Transaction() {
		super();
	}

	// Public Parameterized Constructor
	
	public Transaction(int id, String goal, String accountNumber, String username,
			String transactionType,String creditOrDebit, String date, int amount) {
		super();
		this.id = id;
		this.goal = goal;
		this.accountNumber = accountNumber;
		this.username = username;
		this.transactionType = transactionType;
		this.creditOrDebit=creditOrDebit;
		this.date = date;
		this.amount = amount;
	}

	
	// Setters and Getters
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGoal() {
		return goal;
	}

	public void setGoal(String goal) {
		this.goal = goal;
	}

	

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountName(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public String getCreditOrDebit() {
		return creditOrDebit;
	}
	public void setCreditOrDebit(String creditOrDebit) {
		this.creditOrDebit=creditOrDebit;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	// toString methods

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", goal=" + goal + ", accountNumber="
				+ accountNumber + ", username=" + username + ", transactionType=" + transactionType + ", creditOrDebit="
				+ creditOrDebit + ", date=" + date + ", amount=" + amount + "]";
	}

	
	
	
	
	
	
	
	
}
