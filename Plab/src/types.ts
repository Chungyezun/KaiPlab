import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export interface ChatRoom {
    id: string;
    name: string;
    description: string;
    startTime: string;
    currentMembers: number;
    totalMembers: number;
    date: Date;
}

export interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: Date;
}

export interface UserInfo {
    id: number;
    username: string;
    email: string;
}

export type RootStackParamList = {
    Home: undefined;
    Room: { roomId: string; roomName: string };
    Login: undefined;
    MainTabs: undefined;
};

export type MainTabParamList = {
    '홈': undefined;
    '개설': undefined;
    '내방': undefined;
    '마이페이지': undefined;
};

export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, '홈'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type CreateRoomScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, '개설'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type MyRoomsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, '내방'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type MyPageScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, '마이페이지'>,
    NativeStackScreenProps<RootStackParamList>
>;

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type RoomScreenProps = NativeStackScreenProps<RootStackParamList, 'Room'>;