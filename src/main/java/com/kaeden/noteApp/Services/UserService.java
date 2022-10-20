package com.kaeden.noteApp.Services;

import com.kaeden.noteApp.dtos.UserDto;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {
    //METHODS
    @Transactional
    List<String> addUser(UserDto userDto);


    List<String> userLogin(UserDto userDto);
}
