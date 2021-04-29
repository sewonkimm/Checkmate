package com.ssafy.checkmate.auth.repository;

import com.ssafy.checkmate.auth.dto.Auth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends CrudRepository<Auth, String> {
}
