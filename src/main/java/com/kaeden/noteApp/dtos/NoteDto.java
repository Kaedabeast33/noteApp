package com.kaeden.noteApp.dtos;

import com.kaeden.noteApp.entities.Note;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto implements Serializable {
    //FIELDS
    private Long id;
    private String header;
    private String body;
    private UserDto userDto;

    //CONSTRUCTOR
    public NoteDto(Note note){
       if(note.getId()!= null){
           this.id = note.getId();
        }if(note.getBody()!=null){
            this.body = note.getBody();
        }if(note.getHeader()!= null){
           this.header = note.getHeader();
        }
    }
}
