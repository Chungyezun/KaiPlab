import React, { createContext, useState, useContext, useEffect } from 'react';
import { getRooms } from '../api/rooms';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('방 목록을 가져오는 데 실패했습니다:', error);
    }
  };

  return (
    <RoomContext.Provider value={{ rooms, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = () => useContext(RoomContext);
