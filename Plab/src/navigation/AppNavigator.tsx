import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, RoomScreen, CreateRoomScreen, MyRoomsScreen, MyPageScreen, SplashScreen, LoginScreen } from '../screens';
import Icon from 'react-native-vector-icons/AntDesign';
import { RoomProvider } from '../context/RoomContext';
import { AuthProvider, useAuth } from '../api/auth';
import { RootStackParamList, MainTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

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
      options={{ title: '방 세부 정보', headerShown: false}}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="홈"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#1D4ED8',
      tabBarIcon: ({color, size}) => {
        let iconName;

        if (route.name === "홈"){
          iconName = 'home';
        } else if (route.name === "개설"){
          iconName = 'pluscircleo';
        } else if (route.name === "내방"){
          iconName = 'bars';
        } else if (route.name === "마이페이지"){
          iconName = 'user';
        }

        return <Icon name={iconName} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="홈" component={HomeStack} />
    <Tab.Screen 
      name="개설" 
      component={CreateRoomScreen}
      options={({ navigation }) => ({
      })}
    />
    <Tab.Screen 
      name="내방" 
      component={MyRoomsScreen}
      options={({ navigation }) => ({
      })}
    />
    <Tab.Screen 
      name="마이페이지" 
      component={MyPageScreen}
      options={({ navigation }) => ({
      })}
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <AuthProvider>
      <RoomProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </RoomProvider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isLoading, userToken } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;