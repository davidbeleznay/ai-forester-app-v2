import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedFormsScreen({ navigation }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForms();
    
    // Add a listener to refresh forms when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadForms();
    });

    return unsubscribe;
  }, [navigation]);

  const loadForms = async () => {
    try {
      setLoading(true);
      const storedForms = await AsyncStorage.getItem('forestForms');
      if (storedForms) {
        // Sort forms by date (newest first)
        const parsedForms = JSON.parse(storedForms);
        parsedForms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setForms(parsedForms);
      } else {
        setForms([]);
      }
    } catch (error) {
      console.error('Error loading forms:', error);
      Alert.alert('Error', 'Failed to load saved observations');
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this observation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedForms = forms.filter(form => form.id !== id);
              await AsyncStorage.setItem('forestForms', JSON.stringify(updatedForms));
              setForms(updatedForms);
            } catch (error) {
              console.error('Error deleting form:', error);
              Alert.alert('Error', 'Failed to delete the observation');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderFormItem = ({ item }) => (
    <TouchableOpacity
      style={styles.formCard}
      onPress={() => navigation.navigate('FormDetail', { formId: item.id })}
    >
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteForm(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.formSpecies}>{item.species}</Text>
      <Text style={styles.formDate}>{formatDate(item.createdAt)}</Text>
      
      {item.location && (
        <Text style={styles.formLocation}>
          📍 {item.location.latitude.toFixed(6)}, {item.location.longitude.toFixed(6)}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No saved observations yet</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('NewForm')}
      >
        <Text style={styles.createButtonText}>Create New Observation</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2a9d8f" />
        <Text style={styles.loadingText}>Loading observations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={forms}
        renderItem={renderFormItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('NewForm')}
      >
        <Text style={styles.fabButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 300,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264653',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  formSpecies: {
    fontSize: 16,
    color: '#2a9d8f',
    marginBottom: 4,
  },
  formDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  formLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  fabButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2a9d8f',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});