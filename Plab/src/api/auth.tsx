import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './client';

interface AuthContextType {
  userToken: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        console.error('토큰 복원 실패:', e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username: string, password: string) => {
        try {
          const formData = new URLSearchParams();
          formData.append('username', username);
          formData.append('password', password);

          const response = await apiClient.post('/token', formData.toString(), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          const { access_token } = response.data;
          await AsyncStorage.setItem('token', access_token);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          setUserToken(access_token);
        } catch (e) {
          console.error('로그인 실패:', e);
          throw e;
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
          delete apiClient.defaults.headers.common['Authorization'];
          setUserToken(null);
        } catch (e) {
          console.error('로그아웃 실패:', e);
          throw e;
        }
      },
      userToken,
      isLoading,
    }),
    [userToken, isLoading]
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
