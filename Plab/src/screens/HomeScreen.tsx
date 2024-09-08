import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View className='flex-1 justify-center items-center p-4 bg-gray-100'>
      <Text className='text-3xl font-bold mb-6 text-blue-600'>풋살 방 목록</Text>
      <Button
        title="방으로 이동"
        onPress={() => navigation.navigate('Room')}
        color="#1D4ED8" // Tailwind 색상 예제
      />
    </View>
  );
};

export default HomeScreen;