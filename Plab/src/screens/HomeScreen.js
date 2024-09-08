import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>풋살 방 목록</Text>
      {/* 방 목록을 여기서 보여줄 예정 */}
      <Button
        title="방으로 이동"
        onPress={() => navigation.navigate('Room')}
      />
    </View>
  );
};

export default HomeScreen;