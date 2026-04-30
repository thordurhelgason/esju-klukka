import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmployeeScreen from './screens/EmployeeScreen';
import ManagerScreen from './screens/ManagerScreen';
import { TimeProvider } from './context/TimeContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TimeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: '#999',
            }}
          >
            <Tab.Screen
              name="Employee"
              component={EmployeeScreen}
              options={{
                title: 'Clock In/Out',
                tabBarLabel: 'Employee',
              }}
            />
            <Tab.Screen
              name="Manager"
              component={ManagerScreen}
              options={{
                title: 'Time Records',
                tabBarLabel: 'Manager',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </TimeProvider>
    </GestureHandlerRootView>
  );
}
