import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Button, Modal, Provider } from '@ant-design/react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  startTime: string;
  currentMembers: number;
  totalMembers: number;
  date: Date;
}

const initialChatRooms: ChatRoom[] = [
  { id: '1', name: '같이 풋살해요', description: '교내 풋살장 A', startTime: '10:00', currentMembers: 8, totalMembers: 12, date: new Date(2023, 4, 15) },
  { id: '2', name: '풋살 즐기기', description: '교내 풋살장 B', startTime: '12:00', currentMembers: 5, totalMembers: 10, date: new Date(2023, 4, 16) },
  { id: '3', name: '풋살 초보 환영', description: '교내 풋살장 A', startTime: '14:00', currentMembers: 12, totalMembers: 12, date: new Date(2023, 4, 17) },
  { id: '4', name: '풋살 고수 모임', description: '교내 풋살장 C', startTime: '16:00', currentMembers: 9, totalMembers: 12, date: new Date(2023, 4, 18) },
  { id: '5', name: '주말 풋살 매치', description: '교내 풋살장 A', startTime: '18:00', currentMembers: 6, totalMembers: 10, date: new Date(2023, 4, 19) },
  { id: '6', name: '풋살로 스트레스 해소', description: '교내 풋살장 B', startTime: '20:00', currentMembers: 11, totalMembers: 12, date: new Date(2023, 4, 20) },
  { id: '7', name: '일요일 풋살', description: '교내 풋살장 C', startTime: '15:00', currentMembers: 7, totalMembers: 10, date: new Date(2023, 4, 21) },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState(initialChatRooms);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const toggleModal = () => setModalVisible(!isModalVisible);

  const openRoomModal = (room: ChatRoom) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  const enterRoom = () => {
    if (selectedRoom) {
      if (selectedRoom.currentMembers < selectedRoom.totalMembers) {
        navigation.navigate('Room', { roomId: selectedRoom.id, roomName: selectedRoom.name });
        toggleModal();
      } else {
        // 최대 인원에 도달한 경우 경고 메시지 표시
        Alert.alert('입장 불가', '이 방은 이미 최대 인원에 도달했습니다.');
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterRooms(query, selectedDay);
  };

  const handleDaySelect = (day: string) => {
    if (selectedDay === day) {
      setSelectedDay('');
      filterRooms(searchQuery, '');
    } else {
      setSelectedDay(day);
      filterRooms(searchQuery, day);
    }
  };

  const filterRooms = (query: string, day: string) => {
    let filteredRooms = initialChatRooms;
    if (query) {
      filteredRooms = filteredRooms.filter(room =>
        room.name.toLowerCase().includes(query.toLowerCase()) ||
        room.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (day) {
      const dayIndex = ['일', '월', '화', '수', '목', '금', '토'].indexOf(day);
      filteredRooms = filteredRooms.filter(room => room.date.getDay() === dayIndex);
    }
    setChatRooms(filteredRooms);
  };

  const renderRoomItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-4 mb-2 bg-white rounded-lg shadow ${
        item.currentMembers >= item.totalMembers ? 'opacity-50' : ''
      }`}
      onPress={() => openRoomModal(item)}
      disabled={item.currentMembers >= item.totalMembers}
    >
      <View className='flex-1'>
        <Text className='text-lg font-bold text-blue-600'>{item.name}</Text>
        <Text className='text-sm text-gray-500'>{item.description}</Text>
        <Text className='text-sm text-gray-400'>
          {item.date.toLocaleDateString()} ({days[item.date.getDay()]}) {item.startTime}
        </Text>
      </View>
      <View className='px-2 py-1 bg-gray-200 rounded'>
        <Text className='text-sm text-gray-600'>
          인원: <Text className='font-bold'>{item.currentMembers}</Text>/{item.totalMembers}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Provider>
      <SafeAreaView className='flex-1 bg-gray-100'>
        <View className='p-4'>
          <Text className='text-3xl font-bold mb-4 text-blue-600'>풋살 채팅방 목록</Text>
          
          <TextInput
            className='bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4'
            placeholder='방 이름 또는 설명 검색'
            value={searchQuery}
            onChangeText={handleSearch}
          />

          <View className='flex-row justify-between mb-4'>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                onPress={() => handleDaySelect(day)}
                className={`px-3 py-2 rounded-full ${selectedDay === day ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <Text className={`${selectedDay === day ? 'text-white font-bold' : 'text-gray-700'}`}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <FlatList
            data={chatRooms}
            renderItem={renderRoomItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text className='text-center text-gray-500 mt-4'>해당하는 방이 없습니다.</Text>
            }
          />

          <Modal
            visible={isModalVisible}
            transparent
            onClose={toggleModal}
            footer={[
              { 
                text: '입장', 
                onPress: enterRoom,
                disabled: selectedRoom?.currentMembers >= selectedRoom?.totalMembers
              },
              { text: '닫기', onPress: toggleModal }
            ]}
          >
            <View className='p-6 bg-white rounded-lg'>
              <Text className='text-xl font-bold mb-4'>{selectedRoom?.name}</Text>
              <Text className='mb-4'>위치: {selectedRoom?.description}</Text>
              <Text className='mb-4'>시작 시간: {selectedRoom?.startTime}</Text>
              <Text className='mb-4'>날짜: {selectedRoom?.date.toLocaleDateString()}</Text>
              <Text className='mb-4'>요일: {days[selectedRoom?.date.getDay() ?? 0]}</Text>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </Provider>
  );
};