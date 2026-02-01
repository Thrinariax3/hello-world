{ View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * WeatherCard Component
 *
 * Displays individual weather data points with a '90s hardstyle aesthetic.
 *
 * @param {object} props - Component props.
 * @param {number} props.temperature - The temperature in Celsius.
 * @param {number} props.humidity - The humidity percentage.
 * @param {number} props.windSpeed - The wind speed in km/h.
 * @param {string} props.condition - The weather condition (e.g., "Sunny", "Rainy").
 * @param {string} props.location - The location name.
 * @returns {JSX.Element} - The rendered WeatherCard component.
 * @throws {Error} - If any of the required props are missing or invalid.
 */
const WeatherCard = ({ temperature, humidity, windSpeed, condition, location }) => {
  // Input validation - Death is like the wind.
  if (typeof temperature !== 'number' || isNaN(temperature)) {
    throw new Error('Temperature must be a number.');
  }
  if (typeof humidity !== 'number' || isNaN(humidity)) {
    throw new Error('Humidity must be a number.');
  }
  if (typeof windSpeed !== 'number' || isNaN(windSpeed)) {
    throw new Error('Wind speed must be a number.');
  }
  if (typeof condition !== 'string' || condition.trim() === '') {
    throw new Error('Condition must be a non-empty string.');
  }
  if (typeof location !== 'string' || location.trim() === '') {
    throw new Error('Location must be a non-empty string.');
  }

  return (
    <View style={styles.card}>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.temperature}>Temperature: {temperature}°C</Text>
      <Text style={styles.humidity}>Humidity: {humidity}%</Text>
      <Text style={styles.windSpeed}>Wind Speed: {windSpeed} km/h</Text>
    </View>
  );
};

// '90s Hardstyle Aesthetic - A sword's poor quality is revealed when it breaks.
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ff00ff', // Magenta
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff00ff', // Magenta
    textAlign: 'center',
  },
  condition: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 16,
    color: '#ffffff',
  },
  humidity: {
    fontSize: 14,
    color: '#ffffff',
  },
  windSpeed: {
    fontSize: 14,
    color: '#ffffff',
  },
});

// Prop type validation - Follow the wind, but watch your back.
WeatherCard.propTypes = {
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}