package com.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.infosys.entity.Bill;
import com.infosys.repo.BillRepo;
@Service
public class BillServiceImp implements BillService{

	@Autowired BillRepo billRepo;
	
	@Override
	public Bill addBill(Bill bill) {
		return billRepo.save(bill);
		
	}

	@Override
	public List<Bill> retrieveBills(String username) {
		return billRepo.findByUsername(username);	
	}

}