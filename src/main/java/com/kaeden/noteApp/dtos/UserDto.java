package com.kaeden.noteApp.dtos;

import com.kaeden.noteApp.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    //FIELDS
    private Long id;
    private String username;
    private String password;
    private Set<NoteDto> noteDtoSet;

    //CONSTRUCTOR
    public UserDto(User user){
        if(user.getId()!= null){
    this.id = user.getId();
}if(user.getUsername()!= null){
    this.username = user.getUsername();
}if(user.getPassword()!=null){
    this.password = user.getPassword();
        }
    }
}

