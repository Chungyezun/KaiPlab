import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Room'>;

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

export const RoomScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // 더미 데이터로 메시지 초기화
    setMessages([
      { id: '1', sender: '사용자1', message: '안녕하세요!', timestamp: new Date() },
      { id: '2', sender: '사용자2', message: '오늘 풋살 재미있었어요!', timestamp: new Date() },
    ]);
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: '나',
        message: inputMessage.trim(),
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View className="p-2 mb-2 bg-white rounded-lg">
      <Text className="font-bold">{item.sender}</Text>
      <Text>{item.message}</Text>
      <Text className="text-xs text-gray-500">
        {item.timestamp.toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          <View className="bg-blue-600 p-4 flex-row items-center relative">
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-4 z-10">
              <Text className="text-white text-l">← Back</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white text-center flex-1">
              {roomName}
            </Text>
          </View>
          
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            className="flex-1 p-4"
          />
          
          <View className="flex-row p-2 bg-white">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="메시지를 입력하세요"
            />
            <TouchableOpacity 
              onPress={sendMessage}
              className="bg-blue-500 rounded-lg px-4 py-2"
            >
              <Text className="text-white font-bold">전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};