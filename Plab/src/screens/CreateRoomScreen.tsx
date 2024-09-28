import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export const CreateRoomScreen: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [maxMembers, setMaxMembers] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleCreateRoom = () => {
    console.log('방 생성:', { roomName, description, date, time, maxMembers });
  };

  const handleTimeChange = (hour: number) => {
    const newTime = new Date(time);
    newTime.setHours(hour);
    newTime.setMinutes(0);
    newTime.setSeconds(0);
    setTime(newTime);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

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
        <TouchableOpacity
          className='bg-white border border-gray-300 rounded-lg px-4 py-2'
          onPress={() => setShowTimePicker(true)}
        >
          <Text>{time.getHours().toString().padStart(2, '0')}:00</Text>
        </TouchableOpacity>
        
        {showTimePicker && (
          <Picker
            selectedValue={time.getHours()}
            onValueChange={(itemValue) => {
              handleTimeChange(itemValue);
              setShowTimePicker(false);
            }}
          >
            {hours.map((hour) => (
              <Picker.Item key={hour} label={`${hour.toString().padStart(2, '0')}:00`} value={hour} />
            ))}
          </Picker>
        )}
        
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