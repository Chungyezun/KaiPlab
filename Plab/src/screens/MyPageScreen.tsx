import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { UserInfo, MyPageScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import { useAuth } from '../api/auth';

export const MyPageScreen: React.FC<MyPageScreenProps> = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      console.log('Fetching user info...');
      const token = await AsyncStorage.getItem('token');
      console.log('Token exists:', !!token);
      const response = await apiClient.get('/users/me');
      console.log('User info fetched successfully');
      setUserInfo(response.data);
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
      if (error.response && error.response.status === 401) {
        await handleLogout();
        Alert.alert('세션 만료', '다시 로그인해주세요.');
      } else {
        Alert.alert('오류', '사용자 정보를 가져오는데 실패했습니다.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('로그아웃 실패:', error);
      Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
    }
  };

  if (!userInfo) {
    return (
      <SafeAreaView className='flex-1 bg-gray-100 justify-center items-center'>
        <Text className='font-yeon-sung'>로딩 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <View className='p-4'>
        <Text className='text-3xl font-bold mb-6 text-blue-600 font-yeon-sung'>마이페이지</Text>
        
        <View className='items-center mb-6'>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            className='w-32 h-32 rounded-full mb-4'
          />
          <Text className='text-2xl font-bold font-yeon-sung'>{userInfo.username}</Text>
          <Text className='text-gray-600 font-yeon-sung'>{userInfo.email}</Text>
        </View>
        
        <TouchableOpacity className='bg-blue-500 rounded-lg px-4 py-2 mb-4'>
          <Text className='text-white font-bold text-center font-yeon-sung'>프로필 수정</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className='bg-gray-300 rounded-lg px-4 py-2 mb-4'>
          <Text className='text-gray-700 font-bold text-center font-yeon-sung'>비밀번호 변경</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className='bg-red-500 rounded-lg px-4 py-2' onPress={handleLogout}>
          <Text className='text-white font-bold text-center font-yeon-sung'>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
