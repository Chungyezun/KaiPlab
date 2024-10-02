import apiClient from './client';

export const getRooms = () => {
  return apiClient.get('/chat_rooms/');
};

export const createRoom = (roomData) => {
  return apiClient.post('/chat_rooms/', roomData);
};

export const joinRoom = (roomId, userId) => {
  return apiClient.post(`/chat_rooms/${roomId}/join`);
};

export const getMessages = (roomId) => {
  return apiClient.get(`/chat_rooms/${roomId}/messages`);
};

export const sendMessage = (roomId, messageData) => {
  return apiClient.post(`/chat_rooms/${roomId}/messages`, messageData);
};