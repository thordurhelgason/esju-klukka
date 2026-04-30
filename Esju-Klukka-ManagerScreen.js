import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useTime } from '../context/TimeContext';

export default function ManagerScreen() {
  const [sessions, setSessions] = useState([]);
  const { getAllSessions, formatTime } = useTime();

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSessions = async () => {
    const data = await getAllSessions();
    setSessions(data.reverse());
  };

  const calculateTotalHours = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const groupByEmployee = () => {
    const grouped = {};
    sessions.forEach((session) => {
      if (!grouped[session.employeeId]) {
        grouped[session.employeeId] = {
          employeeName: session.employeeName,
          sessions: [],
          totalDuration: 0,
        };
      }
      grouped[session.employeeId].sessions.push(session);
      grouped[session.employeeId].totalDuration += session.duration;
    });
    return grouped;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const employeeGroups = groupByEmployee();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Esju-Klukka</Text>
      <Text style={styles.subtitle}>Manager Dashboard</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Hours Logged</Text>
        <Text style={styles.summaryValue}>{formatTime(calculateTotalHours())}</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Sessions</Text>
        <Text style={styles.summaryValue}>{sessions.length}</Text>
      </View>

      {Object.keys(employeeGroups).length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No time records yet</Text>
        </View>
      ) : (
        Object.entries(employeeGroups).map(([employeeId, group]) => (
          <View key={employeeId} style={styles.employeeCard}>
            <Text style={styles.employeeName}>{group.employeeName}</Text>
            <Text style={styles.employeeId}>ID: {employeeId}</Text>
            <Text style={styles.employeeTotal}>Total: {formatTime(group.totalDuration)}</Text>

            <View style={styles.sessionsContainer}>
              {group.sessions.map((session) => (
                <View key={session.id} style={styles.sessionItem}>
                  <Text style={styles.sessionTime}>
                    {formatDate(session.clockInTime)}
                  </Text>
                  <Text style={styles.sessionDuration}>
                    Duration: {formatTime(session.duration)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 20,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  employeeCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  employeeId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  employeeTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sessionsContainer: {
    marginTop: 10,
  },
  sessionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sessionTime: {
    fontSize: 12,
    color: '#666',
  },
  sessionDuration: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 3,
  },
});
