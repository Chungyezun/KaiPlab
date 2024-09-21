import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, RoomScreen, SearchScreen, CreateRoomScreen, MyRoomsScreen, MyPageScreen } from '../screens';
import Icon from 'react-native-vector-icons/AntDesign';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1D4ED8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Kaist 풋살 모집방', headerShown: false }}
    />
    <Stack.Screen
      name="Room"
      component={RoomScreen}
      options={{ title: '방 세부 정보'}}
    />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#1D4ED8',
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === "홈"){
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
        <Tab.Screen name="홈" component={HomeStack} />
        <Tab.Screen name="검색" component={SearchScreen} />
        <Tab.Screen name="개설" component={CreateRoomScreen} />
        <Tab.Screen name="내방" component={MyRoomsScreen} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;