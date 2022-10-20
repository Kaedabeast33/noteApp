package com.kaeden.noteApp.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kaeden.noteApp.dtos.UserDto;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String username;
    @Column
    private String password;
    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Note> noteSet = new HashSet<>();

//CONSTRUCTOR
    public User(UserDto userDto){
        if(userDto.getUsername()!=null){
            this.username = userDto.getUsername();
        }if (userDto.getPassword()!= null){
            this.password = userDto.getPassword();
        }
    }

    public User() {
    }

    public User(Long id, String username, String password, Set<Note> noteSet) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.noteSet = noteSet;
    }

    //GETTERS AND SETTERS
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id=id;
    }
    //...
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    //...
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //METHOS
}
