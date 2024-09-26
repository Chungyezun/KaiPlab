import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const CreateRoomScreen: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [maxMembers, setMaxMembers] = useState('');

  const handleCreateRoom = () => {
    // 여기에 방 생성 로직을 구현합니다.
    console.log('방 생성:', { roomName, description, date, time, maxMembers });
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <ScrollView className='p-4'>
        <Text className='text-3xl font-bold mb-6 text-blue-600'>방 생성</Text>
        
        <TextInput
          className='bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4'
          placeholder='방 이름'
          value={roomName}
          onChangeText={setRoomName}
        />
        
        <TextInput
          className='bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4'
          placeholder='설명'
          value={description}
          onChangeText={setDescription}
          multiline
        />
        
        <Text className='mb-2'>날짜:</Text>
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
        />
        
        <Text className='mb-2 mt-4'>시간:</Text>
        <DateTimePicker
          value={time}
          mode='time'
          display='default'
          onChange={(event, selectedTime) => setTime(selectedTime || time)}
        />
        
        <TextInput
          className='bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4 mt-4'
          placeholder='최대 인원'
          value={maxMembers}
          onChangeText={setMaxMembers}
          keyboardType='numeric'
        />
        
        <TouchableOpacity
          className='bg-blue-500 rounded-lg px-4 py-2 mt-4'
          onPress={handleCreateRoom}
        >
          <Text className='text-white font-bold text-center'>방 생성하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};