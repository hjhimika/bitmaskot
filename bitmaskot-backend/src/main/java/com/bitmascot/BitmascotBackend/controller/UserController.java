package com.bitmascot.BitmascotBackend.controller;

import com.bitmascot.BitmascotBackend.model.UserRegister;
import com.bitmascot.BitmascotBackend.model.UserLogIn;
import com.bitmascot.BitmascotBackend.model.ChangePassword;
import com.bitmascot.BitmascotBackend.model.User;
import com.bitmascot.BitmascotBackend.model.UserAuthResponse;
import com.bitmascot.BitmascotBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserAuthResponse> registerUser(@RequestBody UserRegister userRegister) {
        UserAuthResponse authResponse = userService.registerUser(userRegister);
        if (authResponse.isError()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        } else {
            return ResponseEntity.ok(authResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> loginUser(@RequestBody UserLogIn userLogIn) {
        UserAuthResponse authResponse = userService.authenticateUser(userLogIn);
        if (authResponse.isError()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        } else {
            return ResponseEntity.ok(authResponse);
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePassword newPassword) {
        userService.changePassword(newPassword);
        return ResponseEntity.ok("Password changed successfully");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
