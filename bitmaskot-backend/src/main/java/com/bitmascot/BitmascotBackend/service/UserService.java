package com.bitmascot.BitmascotBackend.service;

import com.bitmascot.BitmascotBackend.model.User;
import com.bitmascot.BitmascotBackend.model.ChangePassword;
import com.bitmascot.BitmascotBackend.model.UserAuthResponse;
import com.bitmascot.BitmascotBackend.model.UserLogIn;
import com.bitmascot.BitmascotBackend.model.UserRegister;
import com.bitmascot.BitmascotBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final String ADMIN_EMAIL = "admin@localhost.local";
    private static final String ADMIN_PASSWORD = "admin";

    @Autowired
    UserRepository userRepository;

    public UserAuthResponse registerUser(UserRegister userRegister) {
        // check if email already registered
        User existingUser = userRepository.findByEmail(userRegister.getEmail());
        if (existingUser != null) {
            return UserAuthResponse.error("Email already registered");
        }

        // create new user
        User user = new User(userRegister.getEmail(), userRegister.getPassword(), userRegister.getFirstName(),
                userRegister.getLastName(), userRegister.getAddress(), userRegister.getPhone(),
                userRegister.getBirthDate());
        user.setId(null); // Ensure a new ID is generated
        userRepository.save(user);
        return UserAuthResponse.ok(user.getId().toString(), false, "User registered successfully");
    }

    public UserAuthResponse authenticateUser(UserLogIn userLogIn) {
        // check if admin
        if (userLogIn.getEmail().equals(ADMIN_EMAIL) && userLogIn.getPassword().equals(ADMIN_PASSWORD)) {
            return UserAuthResponse.ok(null, true, "Login successful");
        }

        // check if normal user
        User user = userRepository.findByEmail(userLogIn.getEmail());
        if (user == null) {
            return UserAuthResponse.error("Email not registered");
        }

        // check if password matches
        if (!user.getPassword().equals(userLogIn.getPassword())) {
            return UserAuthResponse.error("Invalid credentials");
        }

        return UserAuthResponse.ok(user.getId().toString(), false, "Login successful");
    }

    public void changePassword(ChangePassword changePassword) {
        User user = userRepository.findById(Long.parseLong(changePassword.getUserId())).orElse(null);
        if (user != null) {
            user.setPassword(changePassword.getNewPassword());
            userRepository.save(user);
        }
    }

    public User getUserById(String userId) {
        return userRepository.findById(Long.parseLong(userId)).orElse(null);
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
