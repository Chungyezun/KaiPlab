import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

export const CreateRoomScreen: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  });
  const [maxMembers, setMaxMembers] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    setShowTimePicker(false);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-5">
        <Text className="text-3xl font-bold mb-6 text-blue-600 text-center">방 생성</Text>
        
        <View className="flex-row items-center bg-white rounded-xl mb-4 px-3 py-2 shadow-sm">
          <Icon name="football-outline" size={24} color="#4A90E2" className="mr-3" />
          <TextInput
            className="flex-1 text-base"
            placeholder='방 이름'
            value={roomName}
            onChangeText={setRoomName}
          />
        </View>
        
        <View className="flex-row items-start bg-white rounded-xl mb-4 px-3 py-2 shadow-sm">
          <Icon name="document-text-outline" size={24} color="#4A90E2" className="mr-3 mt-2" />
          <TextInput
            className="flex-1 text-base min-h-[100px]"
            placeholder='설명'
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        <TouchableOpacity 
          className="flex-row items-center bg-white rounded-xl mb-4 px-3 py-4 shadow-sm"
          onPress={() => setShowDatePicker(true)}
        >
          <Icon name="calendar-outline" size={24} color="#4A90E2" className="mr-3" />
          <Text className="text-base text-gray-700">{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode='date'
            display='default'
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
        
        <TouchableOpacity 
          className="flex-row items-center bg-white rounded-xl mb-4 px-3 py-4 shadow-sm"
          onPress={() => setShowTimePicker(true)}
        >
          <Icon name="time-outline" size={24} color="#4A90E2" className="mr-3" />
          <Text className="text-base text-gray-700">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <Picker
            selectedValue={time.getHours()}
            onValueChange={handleTimeChange}
            className="bg-white mb-4"
          >
            {hours.map((hour) => (
              <Picker.Item key={hour} label={`${hour.toString().padStart(2, '0')}:00`} value={hour} />
            ))}
          </Picker>
        )}
        
        <View className="flex-row items-center bg-white rounded-xl mb-4 px-3 py-2 shadow-sm">
          <Icon name="people-outline" size={24} color="#4A90E2" className="mr-3" />
          <TextInput
            className="flex-1 text-base"
            placeholder='최대 인원'
            value={maxMembers}
            onChangeText={setMaxMembers}
            keyboardType='numeric'
          />
        </View>
        
        <TouchableOpacity 
          className="bg-blue-500 rounded-xl py-4 mt-6 shadow-sm"
          onPress={handleCreateRoom}
        >
          <Text className="text-white text-center font-bold text-lg">방 생성하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRoomScreen;