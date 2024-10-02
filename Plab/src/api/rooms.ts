import apiClient from './client';

export const getRooms = () => apiClient.get('/rooms');
export const createRoom = (roomData) => apiClient.post('/rooms', roomData);
export const joinRoom = (roomId, userId) => apiClient.post(`/rooms/${roomId}/join`, { userId });
export const getMessages = (roomId) => apiClient.get(`/rooms/${roomId}/messages`);
export const sendMessage = (roomId, messageData) => apiClient.post(`/rooms/${roomId}/messages`, messageData);