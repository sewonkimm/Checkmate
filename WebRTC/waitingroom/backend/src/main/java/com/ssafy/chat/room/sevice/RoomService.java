package com.ssafy.chat.room.sevice;

import com.ssafy.chat.room.dto.Room;
import com.ssafy.chat.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public void createRoom(Room room) {

        room.setRoomUuid(UUID.randomUUID().toString());
        roomRepository.save(room);
    }

    public List<Room> selectAll() {

        return roomRepository.findAll();
    }

    public Room selectByRoomId(Long roomId) {

        return roomRepository.findRoomByRoomId(roomId);
    }
}
