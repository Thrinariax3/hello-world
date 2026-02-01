{ useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

// Placeholder for API URL - replace with actual API endpoint
const API_URL = 'https://api.example.com/weather'; // Replace with your API URL
const API_KEY = 'YOUR_API_KEY'; // Replace with your API key

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${API_URL}?q=London&appid=${API_KEY}`); // Example: Fetching for London
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (e) {
        setError(e);
        console.error("Error fetching weather data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff00ff" />
        <Text style={styles.loadingText}>Loading Weather...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No weather data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://media.giphy.com/media/l41YhU9W0wWq0/giphy.gif' }} // Replace with a 90s hardstyle GIF
        style={styles.gif}
      />
      <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
      <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</Text>
      <Text style={styles.description}>{weatherData.weather[0].description}</Text>
      {/* Add more weather details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
  },
  noDataContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  city: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    color: '#ff00ff', // Magenta
    fontSize: 36,
    fontWeight: 'bold',
  },
  description: {
    color: '#00ff00', // Green
    fontSize: 18,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
}