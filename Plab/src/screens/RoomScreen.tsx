import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoomScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>방 세부 정보 및 채팅</Text>
      {/* 여기서 채팅 UI와 방 세부 정보 구현 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RoomScreen;