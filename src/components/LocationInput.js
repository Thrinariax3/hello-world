{ useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Mock API call - replace with actual API integration
const fetchWeatherData = async (location) => {
  try {
    // Simulate API request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (location.toLowerCase() === 'error') {
          reject(new Error('Failed to fetch weather data for this location.'));
        } else {
          resolve({
            location: location,
            temperature: Math.floor(Math.random() * 30) + 10, // Random temperature between 10-40
            condition: 'Sunny',
          });
        }
      }, 1000); // Simulate 1 second API call
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Re-throw to be caught by the component
  }
};

const LocationInput = ({ onWeatherDataFetched }) => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleSubmit = async () => {
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a location.');
      return;
    }

    try {
      const weatherData = await fetchWeatherData(location);
      onWeatherDataFetched(weatherData); // Pass data to parent component
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
      console.error('Error in LocationInput:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city or zip code"
        value={location}
        onChangeText={handleLocationChange}
      />
      <Button title="Get Weather" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
}