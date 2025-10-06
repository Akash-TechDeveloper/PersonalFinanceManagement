package com.infosys.service;
import com.infosys.entity.Register;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.repo.RegisterRepo;
@Service
public class RegisterServiceImp implements RegisterService {
		
	@Autowired RegisterRepo repo;
	@Override
	public Register addNewUser(Register register) {
		// TODO Auto-generated method stub
		return repo.save(register);
	}

	@Override
	public Register loginUser(String username, String password) {
		Register user=repo.findByUsername(username);
		if(user!=null && user.getPassword().equals(password)) {
			return user;
		}
		return null;
	}
  
}
