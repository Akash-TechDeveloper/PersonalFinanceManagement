package com.infosys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.entity.Card;
import com.infosys.service.CardService;

@RestController
@CrossOrigin(origins= {"*"})
public class CardController {
	
	@Autowired
	private CardService cardService;
	@PostMapping("/home/add-account")
	public ResponseEntity<String> addAccount(@RequestBody Card card){
		try {
			cardService.saveCard(card);
			return new ResponseEntity<>("Account added successfully",HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>("Failed to add account",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/home/balance")
	public ResponseEntity<List<Card>> getCardsByUsername(@RequestParam String username){
		try {
			List<Card> cards=cardService.getCardsByUsername(username);
			if(cards.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(cards,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/home/balance/update")
	public ResponseEntity<String> updateCardAmount(@RequestParam String accountNumber, @RequestParam double amount) {
	    try {
	        cardService.updateCardAmount(accountNumber, amount);
	        return ResponseEntity.ok("Card amount updated successfully.");
	    }catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
	    }
	}

}
