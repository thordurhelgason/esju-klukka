import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useTime } from '../context/TimeContext';

export default function EmployeeScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentSession, elapsedTime, clockIn, clockOut, formatTime } = useTime();

  const handleLogin = () => {
    if (!employeeId.trim() || !employeeName.trim()) {
      Alert.alert('Error', 'Please enter employee ID and name');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleClockIn = () => {
    if (isLoggedIn && !currentSession?.isActive) {
      clockIn(employeeId, employeeName);
    }
  };

  const handleClockOut = () => {
    if (currentSession?.isActive) {
      clockOut();
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Esju-Klukka</Text>
        <Text style={styles.subtitle}>Employee Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          value={employeeId}
          onChangeText={setEmployeeId}
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          placeholder="Employee Name"
          value={employeeName}
          onChangeText={setEmployeeName}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esju-Klukka</Text>
      <Text style={styles.subtitle}>Welcome, {employeeName}</Text>

      <View style={styles.timeDisplay}>
        <Text style={styles.timeLabel}>Time Elapsed</Text>
        <Text style={styles.timeCounter}>{formatTime(elapsedTime)}</Text>
      </View>

      {currentSession?.isActive ? (
        <>
          <Text style={styles.statusActive}>🟢 Currently Clocked In</Text>
          <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleClockOut}>
            <Text style={styles.buttonText}>Clock Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.statusInactive}>⚪ Not Clocked In</Text>
          <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={handleClockIn}>
            <Text style={styles.buttonText}>Clock In</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => {
          setIsLoggedIn(false);
          setEmployeeId('');
          setEmployeeName('');
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  timeDisplay: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  timeCounter: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#007AFF',
  },
  statusActive: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statusInactive: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#999',
    fontWeight: '600',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonSuccess: {
    backgroundColor: '#4CAF50',
  },
  buttonDanger: {
    backgroundColor: '#f44336',
  },
  buttonSecondary: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
