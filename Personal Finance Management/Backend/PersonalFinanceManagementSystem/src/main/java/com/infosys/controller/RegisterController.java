package com.infosys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.entity.Register;
import com.infosys.service.RegisterService;

@RestController
@CrossOrigin(origins= {"*"})
public class RegisterController {
	
	@Autowired private RegisterService service;
	@PostMapping("/signup")
	public ResponseEntity<String> addNewUser(@RequestBody Register register) {
		Register addUser=service.addNewUser(register);
		if(addUser!=null)
			return new ResponseEntity<>("New User has been successfully registered.",HttpStatus.OK);
		else
			return new ResponseEntity<>("User Registration Failed",HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/signin")
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
        Register loginObj = service.loginUser(username, password);
        if (loginObj != null)
            return new ResponseEntity<>("You are logged in successfully.", HttpStatus.OK);
        else
            return new ResponseEntity<>("Enter valid Username or Password.", HttpStatus.BAD_REQUEST);
    }
}
