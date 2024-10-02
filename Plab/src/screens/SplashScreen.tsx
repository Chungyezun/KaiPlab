import React from 'react';
import { View, Text } from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Text className="text-4xl font-yeon-sung text-white">Kaist Plab</Text>
    </View>
  );
};