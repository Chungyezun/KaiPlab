import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Button, Modal, Provider } from '@ant-design/react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const initialChatRooms = [
  { id: '1', name: '같이 풋살해요', description: '교내 풋살장 A', startTime: '10:00', currentMembers: 8, totalMembers: 12 },
  { id: '2', name: '풋살 즐기기', description: '교내 풋살장 B', startTime: '12:00', currentMembers: 5, totalMembers: 10 },
  { id: '3', name: '풋살 초보 환영', description: '교내 풋살장 A', startTime: '14:00', currentMembers: 12, totalMembers: 12 },
  { id: '4', name: '풋살 고수 모임', description: '교내 풋살장 C', startTime: '16:00', currentMembers: 9, totalMembers: 12 },
  { id: '5', name: '주말 풋살 매치', description: '교내 풋살장 A', startTime: '18:00', currentMembers: 6, totalMembers: 10 },
  { id: '6', name: '풋살로 스트레스 해소', description: '교내 풋살장 B', startTime: '20:00', currentMembers: 11, totalMembers: 12 },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState(initialChatRooms);
  const [selectedRoom, setSelectedRoom] = useState<typeof chatRooms[0] | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const openRoomModal = (room: typeof chatRooms[0]) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  const enterRoom = () => {
    if (selectedRoom) {
      navigation.navigate('Room', { roomId: selectedRoom.id });
      toggleModal(); // 팝업 닫기
    }
  };

  const renderRoomItem = ({ item }: { item: typeof chatRooms[0] }) => (
    <TouchableOpacity
      className='flex-row items-center justify-between p-4 mb-2 bg-white rounded-lg shadow'
      onPress={() => openRoomModal(item)}
    >
      <Text className='text-sm text-gray-400'>{item.startTime}</Text>

      <View className='flex-1 px-4'>
        <Text className='text-l font-bold text-blue-600'>{item.name}</Text>
        <Text className='text-m text-gray-500'>{item.description}</Text>
      </View>

      <View className='px-2 py-1 bg-gray-200 rounded'>
        <Text className='text-sm text-gray-600'>
          인원: <Text className='font-bold'>{item.currentMembers}</Text>명 / {item.totalMembers}명
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Provider>
      <View className='flex-1 p-4 bg-gray-100'>
        <Text className='text-3xl font-bold mb-6 text-blue-600'>풋살 채팅방 목록</Text>
        
        <FlatList
          data={chatRooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
        />

        <Modal
          visible={isModalVisible}
          transparent
          onClose={toggleModal}
          footer={[]}
        >
          <View className='p-6 bg-white rounded-lg'>
            <Text className='text-xl font-bold mb-4'>{selectedRoom?.name}</Text>
            <Text className='mb-4'>위치: {selectedRoom?.description}</Text>
            <Text className='mb-4'>시작 시간: {selectedRoom?.startTime}</Text>

            <View className='flex-row justify-end'>
              <Button
                onPress={enterRoom}
                className='mr-2'
              >
                <Text className='text-blue-600'>입장</Text>
              </Button>
              <Button
                onPress={toggleModal}
              >
                <Text className='text-black'>닫기</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </Provider>
  );
};
