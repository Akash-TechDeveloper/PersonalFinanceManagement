package com.infosys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.infosys.entity.Notification;
import com.infosys.service.NotificationService;

@Controller
@CrossOrigin(origins = {"*"})
public class NotificationController {

    @Autowired
    private NotificationService notifyService;

    @PostMapping("home/addNotify")
    public ResponseEntity<String> addNotify(@RequestBody Notification notify) {
        Notification result = notifyService.addNotify(notify);
        return result != null 
                ? new ResponseEntity<>("New Notification Added Successfully", HttpStatus.OK) 
                : new ResponseEntity<>("Failed to add Notification", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("home/getNotify")
    public ResponseEntity<List<Notification>> getNotifyByUsername(@RequestParam String username) {
        List<Notification> response = notifyService.getNotifyByUsername(username);
        return !response.isEmpty() 
                ? new ResponseEntity<>(response, HttpStatus.OK) 
                : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("home/clear")
    public ResponseEntity<String> clearNotify(@RequestParam String username) {
        String msg = notifyService.clearAllNotify(username);
        return msg.equals("Notification cleared") 
                ? new ResponseEntity<>(msg, HttpStatus.OK) 
                : new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
