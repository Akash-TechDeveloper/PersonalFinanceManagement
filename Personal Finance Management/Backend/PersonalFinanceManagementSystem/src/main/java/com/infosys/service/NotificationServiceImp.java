package com.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.entity.Notification;
import com.infosys.repo.NotificationRepo;

import jakarta.transaction.Transactional;

@Service
public class NotificationServiceImp implements NotificationService {

    @Autowired
    private NotificationRepo notifyRepo;

    @Override
    public Notification addNotify(Notification notify) {
        return notifyRepo.save(notify);
    }

    @Override
    public List<Notification> getNotifyByUsername(String username) {
        return notifyRepo.findByUsername(username);
    }

    @Override
    @Transactional
    public String clearAllNotify(String username) {
        notifyRepo.deleteByUsername(username);
        return notifyRepo.findByUsername(username).isEmpty() ? "Notification cleared" : "Can't clear notification";
    }
}
