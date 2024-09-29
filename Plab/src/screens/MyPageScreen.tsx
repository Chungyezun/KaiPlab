import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export const MyPageScreen: React.FC = () => {
  const userInfo = {
    name: '홍길동',
    email: 'hong@example.com',
    profileImage: 'https://via.placeholder.com/150',
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='p-4'>
        <Text className='text-3xl font-bold mb-6 text-blue-600 font-yeon-sung'>마이페이지</Text>
        
        <View className='items-center mb-6'>
          <Image
            source={{ uri: userInfo.profileImage }}
            className='w-32 h-32 rounded-full mb-4'
          />
          <Text className='text-2xl font-bold font-yeon-sung'>{userInfo.name}</Text>
          <Text className='text-gray-600 font-yeon-sung'>{userInfo.email}</Text>
        </View>
        
        <TouchableOpacity className='bg-blue-500 rounded-lg px-4 py-2 mb-4'>
          <Text className='text-white font-bold text-center font-yeon-sung'>프로필 수정</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className='bg-gray-300 rounded-lg px-4 py-2 mb-4'>
          <Text className='text-gray-700 font-bold text-center font-yeon-sung'>비밀번호 변경</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className='bg-red-500 rounded-lg px-4 py-2'>
          <Text className='text-white font-bold text-center font-yeon-sung'>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
