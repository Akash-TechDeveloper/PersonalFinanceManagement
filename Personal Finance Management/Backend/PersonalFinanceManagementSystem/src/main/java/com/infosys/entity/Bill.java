package com.infosys.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Bill {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int id;
	public String username;
	public String billName;
	public String billDescription;
	public String billNotify;
	public String billDate;
	public int billAmount;
	
	// Public default Constructor
	
	public Bill() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	// Public Parameterized Constructor
	
	public Bill(int id, String username, String billName, String billDescription, String billNotify, String billDate,
			int billAmount) {
		super();
		this.id = id;
		this.username = username;
		this.billName = billName;
		this.billDescription = billDescription;
		this.billNotify = billNotify;
		this.billDate = billDate;
		this.billAmount = billAmount;
	}
	
	// Setter and Getter 
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getBillName() {
		return billName;
	}
	public void setBillName(String billName) {
		this.billName = billName;
	}
	public String getBillDescription() {
		return billDescription;
	}
	public void setBillDescription(String billDescription) {
		this.billDescription = billDescription;
	}
	public String getBillNotify() {
		return billNotify;
	}
	public void setBillNotify(String billNotify) {
		this.billNotify = billNotify;
	}
	public String getBillDate() {
		return billDate;
	}
	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}
	public int getBillAmount() {
		return billAmount;
	}
	public void setBillAmount(int billAmount) {
		this.billAmount = billAmount;
	}
	
	// toString methods
	
	@Override
	public String toString() {
		return "Bill [id=" + id + ", username=" + username + ", billName=" + billName + ", billDescription="
				+ billDescription + ", billNotify=" + billNotify + ", billDate=" + billDate + ", billAmount="
				+ billAmount + "]";
	}
	
	
	
	
}