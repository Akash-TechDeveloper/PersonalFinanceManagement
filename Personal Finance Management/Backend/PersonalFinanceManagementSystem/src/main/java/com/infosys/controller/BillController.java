package com.infosys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.infosys.entity.Bill;
import com.infosys.service.BillService;

@Controller
@CrossOrigin(origins= {"*"})
public class BillController {

	@Autowired BillService billService;
	@PostMapping("/home/bill/add")
	public ResponseEntity<String> addBill(@RequestBody Bill bill)
	{
		Bill response=billService.addBill(bill);
		if(response!=null)
			return new ResponseEntity<>("Bill added Successfully",HttpStatus.OK);
		else
			return new ResponseEntity<>("Failed to add Bill",HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/home/bill")
	public ResponseEntity<List<Bill>> retrieveBills(@RequestParam String username)
	{
		List<Bill> response=billService.retrieveBills(username);
		if(!response.isEmpty())
			return new ResponseEntity<>(response,HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
}