import React, { createContext, useState, useContext, useCallback } from 'react';
import { getRooms } from '../api/rooms';

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  startTime: string;
  currentMembers: number;
  totalMembers: number;
  date: Date;
}

interface RoomContextType {
  rooms: ChatRoom[];
  fetchRooms: () => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('방 목록을 가져오는 데 실패했습니다:', error);
    }
  }, []);

  return (
    <RoomContext.Provider value={{ rooms, fetchRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRooms must be used within a RoomProvider');
  }
  return context;
};
