package com.kaeden.noteApp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kaeden.noteApp.dtos.NoteDto;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="Notes")
@Data
public class Note {

    //FIELDS
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String header;
    @Column
    private String body;
    @ManyToOne
    @JsonBackReference
    private User user;

//Constructor

    public Note(NoteDto noteDto){
        if (noteDto.getBody()!=null) {
            this.body=noteDto.getBody();
        }if(noteDto.getHeader()!=null){
            this.header= noteDto.getHeader();
        }
    }

    public Note() {
    }

    public Note(Long id,String header, String body, User user) {
        this.id = id;
        this.body = body;
        this.user = user;
        this.header = header;
    }

    //GETTERS AND SETTERS

//METHODS

}
