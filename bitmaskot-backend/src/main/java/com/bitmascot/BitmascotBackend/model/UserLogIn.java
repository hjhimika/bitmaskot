package com.bitmascot.BitmascotBackend.model;

public class UserLogIn {
    private final String email;
    private final String password;

    public UserLogIn(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
