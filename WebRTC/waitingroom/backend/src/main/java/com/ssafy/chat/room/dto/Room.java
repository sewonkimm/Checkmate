package com.ssafy.chat.room.dto;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @NonNull
    private String roomName;

    @NonNull
    private String roomType;

    private String roomUuid;

}
