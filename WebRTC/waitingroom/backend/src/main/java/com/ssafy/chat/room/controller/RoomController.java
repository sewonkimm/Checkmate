package com.ssafy.chat.room.controller;

import com.ssafy.chat.room.dto.Room;
import com.ssafy.chat.room.sevice.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/room")
    public void createRoom(@RequestBody Room room) {
        roomService.createRoom(room);
    }

    @GetMapping("/rooms")
    public List<Room> selectAllRoom() {
        return roomService.selectAll();
    }

    @GetMapping("/room/{roomId}")
    public Room selectRoomById(@PathVariable Long roomId) {

        return roomService.selectByRoomId(roomId);
    }

}
