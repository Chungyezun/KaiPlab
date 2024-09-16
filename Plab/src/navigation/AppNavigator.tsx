import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RoomScreen from '../screens/RoomScreen';
import SearchScreen from '../screens/SearchScreen'; // 새로운 화면 추가
import CreateRoomScreen from '../screens/CreateRoomScreen'; // 새로운 화면 추가
import MyRoomsScreen from '../screens/MyRoomsScreen'; // 새로운 화면 추가
import MyPageScreen from '../screens/MyPageScreen'; // 새로운 화면 추가
import Icon from 'react-native-vector-icons/AntDesign';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
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
);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#1D4ED8', // 선택된 탭의 색상
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === "홈1"){
              iconName = 'home';
            } else if (route.name === "검색"){
              iconName = 'search1';
            } else if (route.name === "개설"){
              iconName = 'pluscircleo';
            } else if (route.name === "내방"){
              iconName = 'bars';
            } else if (route.name === "마이페이지"){
              iconName = 'user';
            }

            return <Icon name = {iconName} size = {size} color = {color} />;
          }
        })}
      >
        <Tab.Screen name="홈1" component={HomeStack} />
        <Tab.Screen name="검색" component={SearchScreen} />
        <Tab.Screen name="개설" component={CreateRoomScreen} />
        <Tab.Screen name="내방" component={MyRoomsScreen} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;