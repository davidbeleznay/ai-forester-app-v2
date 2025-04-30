import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Simplified app to test Expo connectivity
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Forester App</Text>
      <Text style={styles.subtitle}>Test Version</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => alert('Button pressed!')}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});