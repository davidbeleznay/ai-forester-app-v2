import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormDetailScreen({ route, navigation }) {
  const { formId } = route.params;
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFormDetails();
  }, [formId]);

  const loadFormDetails = async () => {
    try {
      setLoading(true);
      const storedForms = await AsyncStorage.getItem('forestForms');
      
      if (storedForms) {
        const parsedForms = JSON.parse(storedForms);
        const foundForm = parsedForms.find(item => item.id === formId);
        
        if (foundForm) {
          setForm(foundForm);
          // Set the screen title to the form title
          navigation.setOptions({ title: foundForm.title });
        } else {
          Alert.alert('Error', 'Observation not found');
          navigation.goBack();
        }
      } else {
        Alert.alert('Error', 'No saved observations found');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading form details:', error);
      Alert.alert('Error', 'Failed to load observation details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2a9d8f" />
        <Text style={styles.loadingText}>Loading observation details...</Text>
      </View>
    );
  }

  if (!form) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Observation not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.title}>{form.title}</Text>
        
        <View style={styles.infoSection}>
          <Text style={styles.label}>Species</Text>
          <Text style={styles.value}>{form.species}</Text>
        </View>

        {form.notes && (
          <View style={styles.infoSection}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.notesText}>{form.notes}</Text>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.label}>Date Recorded</Text>
          <Text style={styles.value}>{formatDate(form.createdAt)}</Text>
        </View>

        {form.location && (
          <View style={styles.infoSection}>
            <Text style={styles.label}>Location Coordinates</Text>
            <Text style={styles.value}>
              Latitude: {form.location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.value}>
              Longitude: {form.location.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#e63946',
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a9d8f',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  notesText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#2a9d8f',
  },
});