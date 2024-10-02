import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useAuth } from '../api/auth';
import { LoginScreenProps } from '../types';

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(username, password);
    } catch (error) {
      console.error('로그인 실패:', error);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-100">
      <View className="px-8">
        <Text className="text-3xl font-bold mb-6 text-center text-blue-600">로그인</Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4"
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="bg-white p-4 rounded-lg mb-6"
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold">로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
