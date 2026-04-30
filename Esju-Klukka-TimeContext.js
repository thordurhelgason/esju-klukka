import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    let interval;
    if (currentSession && currentSession.isActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentSession]);

  const loadEmployees = async () => {
    try {
      const data = await AsyncStorage.getItem('employees');
      if (data) {
        setEmployees(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const clockIn = async (employeeId, employeeName) => {
    const session = {
      id: Date.now().toString(),
      employeeId,
      employeeName,
      clockInTime: new Date().toISOString(),
      clockOutTime: null,
      isActive: true,
      duration: 0,
    };

    setCurrentSession(session);
    setElapsedTime(0);

    try {
      await AsyncStorage.setItem(`session_${employeeId}`, JSON.stringify(session));
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  const clockOut = async () => {
    if (!currentSession) return;

    const completedSession = {
      ...currentSession,
      clockOutTime: new Date().toISOString(),
      isActive: false,
      duration: elapsedTime,
    };

    try {
      const sessionsData = await AsyncStorage.getItem('allSessions');
      const allSessions = sessionsData ? JSON.parse(sessionsData) : [];
      allSessions.push(completedSession);
      await AsyncStorage.setItem('allSessions', JSON.stringify(allSessions));
      await AsyncStorage.removeItem(`session_${currentSession.employeeId}`);
    } catch (error) {
      console.error('Error clocking out:', error);
    }

    setCurrentSession(null);
    setElapsedTime(0);
  };

  const getAllSessions = async () => {
    try {
      const data = await AsyncStorage.getItem('allSessions');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <TimeContext.Provider
      value={{
        currentSession,
        elapsedTime,
        employees,
        clockIn,
        clockOut,
        getAllSessions,
        formatTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error('useTime must be used within TimeProvider');
  }
  return context;
};
