import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        })
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Text className="text-4xl font-yeon-sung text-white">Kaist Plab</Text>
    </View>
  );
};