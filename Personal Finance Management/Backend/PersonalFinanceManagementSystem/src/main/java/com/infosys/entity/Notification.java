package com.infosys.entity;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notifyid;
    private String username;
    private String notifyName;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime notifyTime;

    public Notification() {}

    public Notification(int notifyid, String username, String notifyName, LocalDateTime notifyTime) {
        this.notifyid = notifyid;
        this.username = username;
        this.notifyName = notifyName;
        this.notifyTime = notifyTime;
    }

    // Getters and Setters
    public int getNotifyid() {
        return notifyid;
    }

    public void setNotifyid(int notifyid) {
        this.notifyid = notifyid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNotifyName() {
        return notifyName;
    }

    public void setNotifyName(String notifyName) {
        this.notifyName = notifyName;
    }

    public LocalDateTime getNotifyTime() {
        return notifyTime;
    }

    public void setNotifyTime(LocalDateTime notifyTime) {
        this.notifyTime = notifyTime;
    }

    @Override
    public String toString() {
        return "Notification [notifyid=" + notifyid + ", username=" + username + ", notifyName=" + notifyName
                + ", notifyTime=" + notifyTime + "]";
    }
}
