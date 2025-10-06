package com.infosys.service;

import com.infosys.entity.Register;
   
public interface RegisterService {

	public Register addNewUser(Register register);
	public Register loginUser(String username,String password);
}
