import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { v4 as uuidv4 } from 'uuid';

// Import our dynamic form fields component
import DynamicFormField from '../components/DynamicFormField';

export default function NewFormScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    species: '',
    notes: '',
  });
  
  // Dynamic form fields configuration
  const [formFields, setFormFields] = useState([
    { id: 'title', type: 'text', label: 'Observation Title', required: true },
    { id: 'species', type: 'text', label: 'Species Name', required: true },
    { id: 'notes', type: 'textarea', label: 'Notes', required: false },
  ]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Permission to access location was denied');
          setLocationLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Location Error', 'Could not determine your location');
      } finally {
        setLocationLoading(false);
      }
    })();
  }, []);

  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const saveForm = async () => {
    // Validate required fields
    const missingFields = formFields
      .filter(field => field.required && !formData[field.id])
      .map(field => field.label);
    
    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Information',
        `Please fill in the following required fields: ${missingFields.join(', ')}`
      );
      return;
    }

    try {
      // Get existing forms or initialize empty array
      const existingFormsJson = await AsyncStorage.getItem('forestForms');
      const existingForms = existingFormsJson ? JSON.parse(existingFormsJson) : [];
      
      // Create new form entry with unique ID and timestamp
      const newForm = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        location: location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        } : null,
        ...formData
      };
      
      // Save updated forms array
      const updatedForms = [...existingForms, newForm];
      await AsyncStorage.setItem('forestForms', JSON.stringify(updatedForms));
      
      Alert.alert(
        'Success',
        'Observation saved successfully',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('SavedForms')
          }
        ]
      );
    } catch (error) {
      console.error('Error saving form:', error);
      Alert.alert('Error', 'Failed to save the observation');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>New Forest Observation</Text>
        
        {locationLoading ? (
          <View style={styles.locationContainer}>
            <ActivityIndicator size="small" color="#2a9d8f" />
            <Text style={styles.locationText}>Getting your location...</Text>
          </View>
        ) : location ? (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              📍 Location: {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
            </Text>
          </View>
        ) : (
          <View style={styles.locationContainer}>
            <Text style={styles.locationError}>⚠️ Location not available</Text>
          </View>
        )}

        {formFields.map(field => (
          <DynamicFormField
            key={field.id}
            field={field}
            value={formData[field.id]}
            onChange={handleInputChange}
          />
        ))}
        
        <TouchableOpacity style={styles.submitButton} onPress={saveForm}>
          <Text style={styles.submitButtonText}>Save Observation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 20,
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e9f5f3',
    borderRadius: 6,
  },
  locationText: {
    marginLeft: 8,
    color: '#2a9d8f',
    fontSize: 14,
  },
  locationError: {
    color: '#e63946',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#2a9d8f',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});