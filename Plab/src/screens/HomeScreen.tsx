import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// 채팅방 데이터 예제
const initialChatRooms = [
  { id: '1', name: '같이 풋살해요', description: '교내 풋살장 A', startTime: '10:00', currentMembers: 8, totalMembers: 12 },
  { id: '2', name: '풋살 즐기기', description: '교내 풋살장 B', startTime: '12:00', currentMembers: 5, totalMembers: 10 },
  { id: '3', name: '풋살 초보 환영', description: '교내 풋살장 A', startTime: '14:00', currentMembers: 12, totalMembers: 12 },
  { id: '4', name: '풋살 고수 모임', description: '교내 풋살장 C', startTime: '16:00', currentMembers: 9, totalMembers: 12 },
  { id: '5', name: '주말 풋살 매치', description: '교내 풋살장 A', startTime: '18:00', currentMembers: 6, totalMembers: 10 },
  { id: '6', name: '풋살로 스트레스 해소', description: '교내 풋살장 B', startTime: '20:00', currentMembers: 11, totalMembers: 12 },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState(initialChatRooms);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const [newRoomStartTime, setNewRoomStartTime] = useState('');
  const [newRoomTotalMembers, setNewRoomTotalMembers] = useState(12);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const createRoom = () => {
    const newRoom = {
      id: (chatRooms.length + 1).toString(),
      name: newRoomName,
      description: newRoomDescription,
      startTime: newRoomStartTime,
      currentMembers: 0,
      totalMembers: newRoomTotalMembers,
    };
    setChatRooms([...chatRooms, newRoom]);
    toggleModal(); // 닫기
    setNewRoomName('');
    setNewRoomDescription('');
    setNewRoomStartTime('');
    setNewRoomTotalMembers(12);
  };

  const renderRoomItem = ({ item }: { item: typeof chatRooms[0] }) => (
    <TouchableOpacity
      className='flex-row items-center justify-between p-4 mb-2 bg-white rounded-lg shadow'
      onPress={() => navigation.navigate('Room', { roomId: item.id })}
    >
      {/* 왼쪽: 시간 표시 */}
      <Text className='text-sm text-gray-400'>{item.startTime}</Text>

      {/* 중앙: 방 이름과 설명 */}
      <View className='flex-1 px-4'>
        <Text className='text-l font-bold text-blue-600'>{item.name}</Text>
        <Text className='text-m text-gray-500'>{item.description}</Text>
      </View>

      {/* 오른쪽: 현재 인원 / 최대 인원 */}
      <View className='px-2 py-1 bg-gray-200 rounded'>
        <Text className='text-sm text-gray-600'>
          인원: <Text className='font-bold'>{item.currentMembers}</Text>명 / {item.totalMembers}명
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 p-4 bg-gray-100'>
      <Text className='text-3xl font-bold mb-6 text-blue-600'>풋살 채팅방 목록</Text>
      
      {/* 방 생성 버튼 */}
      <Button title="방 생성" onPress={toggleModal} color="#1D4ED8" />

      <FlatList
        data={chatRooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
      />

      {/* 방 생성 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
          <View className='w-3/4 bg-white p-6 rounded-lg shadow'>
            <Text className='text-xl font-bold mb-4'>새로운 방 생성</Text>
            <TextInput
              className='border p-2 mb-2'
              placeholder="방 이름"
              value={newRoomName}
              onChangeText={setNewRoomName}
            />
            <TextInput
              className='border p-2 mb-2'
              placeholder="풋살장 위치"
              value={newRoomDescription}
              onChangeText={setNewRoomDescription}
            />
            <TextInput
              className='border p-2 mb-2'
              placeholder="시작 시간 (예: 10:00)"
              value={newRoomStartTime}
              onChangeText={setNewRoomStartTime}
            />
            <Button title="방 생성하기" onPress={createRoom} color="#1D4ED8" />
            <Button title="취소" onPress={toggleModal} color="#6B7280" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;