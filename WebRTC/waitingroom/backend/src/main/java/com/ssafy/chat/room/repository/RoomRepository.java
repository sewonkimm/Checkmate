package com.ssafy.chat.room.repository;

import com.ssafy.chat.room.dto.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends CrudRepository<Room, String> {

    public Room findRoomByRoomId(Long roomId);

    public List<Room> findAll();

    public void deleteRoomByRoomId(Long roomId);
}
