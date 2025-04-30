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

4. Start with a clean cache if needed
```bash
npx expo start --clear
```

5. Scan the QR code with the Expo Go app on your mobile device

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
- 2025-04-30: Initial project setup with dynamic form system