import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  date: Date;
  startTime: string;
}

export const MyRoomsScreen: React.FC = () => {
  const myRooms: ChatRoom[] = [
    { id: '1', name: '내가 만든 풋살방', description: '교내 풋살장 A', date: new Date(2023, 4, 20), startTime: '18:00' },
    { id: '2', name: '참여 중인 풋살방', description: '교내 풋살장 B', date: new Date(2023, 4, 22), startTime: '20:00' },
  ];

  const renderRoomItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity className='bg-white p-4 mb-2 rounded-lg shadow'>
      <Text className='text-lg font-bold text-blue-600'>{item.name}</Text>
      <Text className='text-sm text-gray-500'>{item.description}</Text>
      <Text className='text-sm text-gray-400'>
        {item.date.toLocaleDateString()} {item.startTime}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='p-4'>
        <Text className='text-3xl font-bold mb-6 text-blue-600'>내 채팅방</Text>
        
        <FlatList
          data={myRooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className='text-center text-gray-500 mt-4'>참여 중인 채팅방이 없습니다.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};