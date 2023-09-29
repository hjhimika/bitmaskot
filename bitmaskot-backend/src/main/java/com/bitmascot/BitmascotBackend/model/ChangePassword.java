package com.bitmascot.BitmascotBackend.model;

public class ChangePassword {
    private String userId;
    private String newPassword;

    public ChangePassword(String userId, String newPassword) {
        this.userId = userId;
        this.newPassword = newPassword;
    }

    public String getUserId() {
        return userId;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
