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
- Node.js
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

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

3. Start the development server
```bash
npx expo start
```

4. If you encounter issues, start with a clean cache
```bash
npx expo start --clear
```

5. Scan the QR code with the Expo Go app on your mobile device

### Troubleshooting
If you get an error about "Failed to parse manifest" or other Expo compatibility issues:

1. Make sure you have the latest version of Expo Go installed on your device
2. Try running with the clear cache option:
```bash
npx expo start --clear
```
3. Verify your Expo Go app version is compatible with SDK 49

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
- 2025-04-30: Update Expo SDK for better compatibility
  - Updated to Expo SDK 49
  - Fixed manifest parsing issues
  - Updated dependencies to match SDK version
- 2025-04-30: Initial project setup with dynamic form system
  - Created basic project structure with React Native and Expo
  - Implemented navigation between screens
  - Added dynamic form fields component
  - Added location tracking and form storage
  - Set up saved forms list view with CRUD operations