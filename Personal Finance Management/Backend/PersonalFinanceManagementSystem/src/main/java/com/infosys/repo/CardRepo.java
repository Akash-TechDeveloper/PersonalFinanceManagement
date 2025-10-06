package com.infosys.repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.infosys.entity.Card;


@Repository
public interface CardRepo extends JpaRepository<Card, Integer> {
	List<Card> findByUsername(String username);
	Card findByAccountNumber(String accountNumber);
}
