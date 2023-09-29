package com.bitmascot.BitmascotBackend.repository;

import com.bitmascot.BitmascotBackend.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
}
