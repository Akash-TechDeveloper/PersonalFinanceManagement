package com.infosys.service;

import java.util.List;

import com.infosys.entity.Notification;

public interface NotificationService {
	public Notification addNotify(Notification notify);
	public List<Notification> getNotifyByUsername(String username);
	public String clearAllNotify(String username);
}
