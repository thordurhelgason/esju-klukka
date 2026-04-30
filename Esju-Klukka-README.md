# Esju-Klukka - Time Tracking App

A React Native mobile app for employee time tracking with employee and manager interfaces.

## Project Structure

```
Esju-Klukka/
├── App.js                    # Main app entry point with navigation
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── context/
│   └── TimeContext.js        # Global time tracking state management
├── screens/
│   ├── EmployeeScreen.js     # Employee clock in/out interface
│   └── ManagerScreen.js      # Manager dashboard
└── assets/                   # App icons and images (to be added)
```

## Features

✅ **Employee Interface:**
- Login with Employee ID and Name
- Clock in/out buttons
- Real-time hh:mm:ss counter display
- Session status indicator
- Logout functionality

✅ **Manager Dashboard:**
- View total hours logged across all employees
- Session count
- Breakdown by employee
- Individual session details with clock-in times
- Auto-refresh every 5 seconds

✅ **Data Persistence:**
- Local AsyncStorage for time records
- Session data persists between app restarts
- Easy to scale to backend API

## Getting Started

### Setup Instructions

1. **Run the setup script** (from Desktop):
   ```
   setup-esju-klukka.bat
   ```

2. **Copy files to project directory:**
   - Move all `Esju-Klukka-*.js` files to the project folder
   - Rename them by removing the `Esju-Klukka-` prefix
   - Example: `Esju-Klukka-App.js` → `App.js` in `context/`, `screens/` directories

3. **Install dependencies:**
   ```
   cd C:\Users\repos\Esju-Klukka
   npm install
   ```

4. **Start the app:**
   ```
   npm start
   ```
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web

## How to Use

### Employee Interface
1. Enter your Employee ID and Name
2. Tap "Login"
3. Tap "Clock In" to start your session
4. Watch the timer count up in hh:mm:ss format
5. Tap "Clock Out" when finished
6. Tap "Logout" to return to login screen

### Manager Dashboard
1. Switch to "Manager" tab
2. View total hours and session count
3. See breakdown by employee
4. Click on an employee to see their individual sessions
5. Dashboard updates automatically every 5 seconds

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform & build service
- **React Navigation** - Tab-based navigation
- **React Context API** - State management
- **AsyncStorage** - Local data persistence
- **React Native Reanimated** - Smooth animations

## Notes

- Time counter updates every second
- All data is stored locally (can be migrated to a backend)
- App supports both iOS and Android
- Manager interface doesn't require login (accessible to anyone with app access)
- Consider adding authentication later for production use
