import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RoomScreen from '../screens/RoomScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1D4ED8', // 헤더 배경색
          },
          headerTintColor: '#fff', // 헤더 텍스트 색상
          headerTitleStyle: {
            fontWeight: 'bold', // 제목 텍스트의 굵기
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Kaist 풋살 모집방' }} // 화면 제목
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{ title: '모집방 세부 정보' }} // 화면 제목
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;