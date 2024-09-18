import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from '@ant-design/react-native';

const App: React.FC = () => {
  return (
  // <Provider>
    <AppNavigator />
  // </Provider>
  );
};

export default App;