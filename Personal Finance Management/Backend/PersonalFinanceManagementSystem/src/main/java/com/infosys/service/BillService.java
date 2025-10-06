package com.infosys.service;

import java.util.List;

import com.infosys.entity.Bill;

public interface BillService{
	public Bill addBill(Bill bill);
	public List<Bill> retrieveBills(String username);
}