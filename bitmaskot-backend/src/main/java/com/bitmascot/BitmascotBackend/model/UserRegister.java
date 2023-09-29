package com.bitmascot.BitmascotBackend.model;

public class UserRegister {
    private final String email;
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String address;
    private final String phone;
    private final String birthDate;

    public UserRegister(String email, String password, String firstName, String lastName, String address, String phone,
            String birthDate) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.birthDate = birthDate;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getBirthDate() {
        return birthDate;
    }
}
