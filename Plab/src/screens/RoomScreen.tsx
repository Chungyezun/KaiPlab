import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Room'>;

const RoomScreen: React.FC<Props> = ({ route }) => {
  const { roomId } = route.params;

  return (
    <View className='flex-1 justify-center items-center p-4 bg-gray-200'>
      <Text className='text-3xl font-bold mb-6 text-green-600'>
        방 세부 정보 및 채팅 (ID: {roomId})
      </Text>
    </View>
  );
};

export default RoomScreen;