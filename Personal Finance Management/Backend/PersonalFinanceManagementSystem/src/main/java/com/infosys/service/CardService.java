package com.infosys.service;

import java.util.List;

import com.infosys.entity.Card;

public interface CardService {
	public Card saveCard(Card card);
	public List<Card> getCardsByUsername(String username);
	void updateCardAmount(String accountNumber, double newTotalAmount);
	
}
