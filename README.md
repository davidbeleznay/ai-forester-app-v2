# AI Forester App

A React Native mobile application for forest observation and data collection.

## Overview
AI Forester App allows field researchers to create and manage forest observations with a dynamic form system.

## Features
- Dynamic field form system
- Location tracking
- Photo capture functionality
- Offline data storage
- Form template system

## Getting Started

### Prerequisites
- Node.js (v16 or v18 recommended)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (compatible with SDK 47)

### Installation
1. Clone the repository
```bash
git clone https://github.com/davidbeleznay/ai-forester-app-v2.git
cd ai-forester-app-v2
```

2. Install dependencies
```bash
npm install
```

3. Start the development server with the troubleshooting script
```bash
.\start.bat
```
This script clears caches and starts Expo with tunnel mode for better connectivity.

### Version Compatibility
This app uses Expo SDK 47, which requires a compatible version of Expo Go. If you encounter compatibility issues:

1. Check your Expo Go app version - it should support SDK 47
2. You can check compatibility at: https://docs.expo.dev/workflow/expo-go/
3. Consider downgrading/upgrading Expo Go to match SDK 47

### Troubleshooting
If you encounter issues:

1. Make sure you're running the app using `.\start.bat` which includes necessary cleanup
2. Try clearing npm cache: `npm cache clean --force`
3. Make sure you have a stable internet connection
4. If using Metro on port 8081 fails, try: `npx expo start --port 8082`
5. On corporate networks, try connecting via mobile hotspot instead

## Project Structure
```
ai-forester-app/
├── assets/              # Images, fonts, and other static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── utils/           # Utility functions
│   └── services/        # API and service functions
├── App.js               # Main application component
└── README.md            # Project documentation
```

## Changelog
- 2025-04-30: Fix Expo SDK compatibility issues
  - Set SDK version to 47 to match Expo Go compatibility
  - Added improved troubleshooting script
  - Simplified Metro configuration
  - Fixed dependency versions

- 2025-04-30: Initial project setup with dynamic form system
  - Created basic project structure with React Native and Expo
  - Implemented navigation between screens
  - Added dynamic form fields component
  - Added location tracking and form storage
  - Set up saved forms list view with CRUD operations