import React from 'react';
import { View, Text } from 'react-native';
import { tw } from 'nativewind';

const RoomScreen: React.FC = () => {
  return (
    <View className='flex-1 justify-center items-center p-4 bg-gray-200'>
      <Text className='text-3xl font-bold mb-6 text-green-600'>방 세부 정보 및 채팅</Text>
      {/* 여기에 채팅 UI와 방 세부 정보 구현 */}
    </View>
  );
};

export default RoomScreen;