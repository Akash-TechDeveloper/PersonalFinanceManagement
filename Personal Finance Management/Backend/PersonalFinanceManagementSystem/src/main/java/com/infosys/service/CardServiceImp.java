package com.infosys.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.infosys.entity.Card;
import com.infosys.repo.CardRepo;

@Service
public class CardServiceImp implements CardService {
	
	@Autowired private CardRepo cardRepo;
	@Override
	public Card saveCard(Card card) {
		return cardRepo.save(card);
	}
	
	@Override
	public List<Card> getCardsByUsername(String username){
		return cardRepo.findByUsername(username);
	}
	
	@Override
	public void updateCardAmount(String accountNumber, double newTotalAmount) {
	    System.out.println("Finding card with number: " + accountNumber);
	    Card existingCard = cardRepo.findByAccountNumber(accountNumber);

	    if (existingCard != null) {
	        existingCard.setAmount(existingCard.getAmount()+(int) newTotalAmount);
	        cardRepo.save(existingCard);
	        System.out.println("Card updated successfully.");
	    } else {
	        throw new RuntimeException("Card with number " + accountNumber + " not found.");
	    }
	}

}
