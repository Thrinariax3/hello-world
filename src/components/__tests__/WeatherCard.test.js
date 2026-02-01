{ render, screen } from '@testing-library/react-native';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import WeatherCard from '../components/WeatherCard';

// Unit Tests - Toxic Shot (Direct Hits)
describe('WeatherCard Component', () => {
  it('renders the location correctly', () => {
    render(<WeatherCard location="Teemo's Outpost" temperature={25} humidity={60} windSpeed={10} condition="Sunny" />);
    expect(screen.getByText('Teemo\'s Outpost')).toBeDefined();
  });

  it('renders the condition correctly', () => {
    render(<WeatherCard location="Teemo's Outpost" temperature={25} humidity={60} windSpeed={10} condition="Rainy" />);
    expect(screen.getByText('Rainy')).toBeDefined();
  });

  it('renders the temperature correctly', () => {
    render(<WeatherCard location="Teemo's Outpost" temperature={25} humidity={60} windSpeed={10} condition="Sunny" />);
    expect(screen.getByText('Temperature: 25°C')).toBeDefined();
  });

  it('renders the humidity correctly', () => {
    render(<WeatherCard location="Teemo's Outpost" temperature={25} humidity={60} windSpeed={10} condition="Sunny" />);
    expect(screen.getByText('Humidity: 60%')).toBeDefined();
  });

  it('renders the wind speed correctly', () => {
    render(<WeatherCard location="Teemo's Outpost" temperature={25} humidity={60} windSpeed={10} condition="Sunny" />);
    expect(screen.getByText('Wind Speed: 10 km/h')).toBeDefined();
  });

  it('applies the correct styling to the card', () => {
    render(<WeatherCard location="Teemo's Outpost" temperature={25} humidity={60} windSpeed={10} condition="Sunny" />);
    const cardElement = screen.getByTestId('weather-card'); // Add testId to WeatherCard in component
    expect(cardElement).toHaveStyle({
      backgroundColor: '#000',
      padding: 20,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: '#ff00ff',
    });
  });
});

// Integration Tests - Blinding Dart (System Integration)
describe('WeatherCard Integration', () => {
  it('renders all data points within the card', () => {
    render(<WeatherCard location="Bandle City" temperature={18} humidity={75} windSpeed={5} condition="Cloudy" />);
    expect(screen.getByText('Bandle City')).toBeDefined();
    expect(screen.getByText('Cloudy')).toBeDefined();
    expect(screen.getByText('Temperature: 18°C')).toBeDefined();
    expect(screen.getByText('Humidity: 75%')).toBeDefined();
    expect(screen.getByText('Wind Speed: 5 km/h')).toBeDefined();
  });
});

// Edge Case Tests - Mushroom Traps (Hidden in Unexpected Places)
describe('WeatherCard Edge Cases', () => {
  it('renders with zero temperature', () => {
    render(<WeatherCard location="Freljord" temperature={0} humidity={80} windSpeed={15} condition="Snowy" />);
    expect(screen.getByText('Temperature: 0°C')).toBeDefined();
  });

  it('renders with negative temperature', () => {
    render(<WeatherCard location="Freljord" temperature={-10} humidity={80} windSpeed={15} condition="Snowy" />);
    expect(screen.getByText('Temperature: -10°C')).toBeDefined();
  });

  it('renders with high humidity', () => {
    render(<WeatherCard location="Summoner's Rift" temperature={30} humidity={100} windSpeed={8} condition="Humid" />);
    expect(screen.getByText('Humidity: 100%')).toBeDefined();
  });

  it('renders with zero wind speed', () => {
    render(<WeatherCard location="Ionia" temperature={22} humidity={50} windSpeed={0} condition="Calm" />);
    expect(screen.getByText('Wind Speed: 0 km/h')).toBeDefined();
  });
});

// Error Handling Tests - Move Quick (Escape Routes)
describe('WeatherCard Error Handling', () => {
  it('throws an error when temperature is not a number', () => {
    expect(() => render(<WeatherCard location="Unknown" temperature="abc" humidity={60} windSpeed={10} condition="Sunny" />)).toThrowError('Temperature must be a number.');
  });

  it('throws an error when humidity is not a number', () => {
    expect(() => render(<WeatherCard location="Unknown" temperature={25} humidity="def" windSpeed={10} condition="Sunny" />)).toThrowError('Humidity must be a number.');
  });

  it('throws an error when windSpeed is not a number', () => {
    expect(() => render(<WeatherCard location="Unknown" temperature={25} humidity={60} windSpeed="ghi" condition="Sunny" />)).toThrowError('Wind speed must be a number.');
  });

  it('throws an error when condition is not a string', () => {
    expect(() => render(<WeatherCard location="Unknown" temperature={25} humidity={60} windSpeed={10} condition={123} />)).toThrowError('Condition must be a non-empty string.');
  });

  it('throws an error when location is not a string', () => {
    expect(() => render(<WeatherCard location={456} temperature={25} humidity={60} windSpeed={10} condition="Sunny" />)).toThrowError('Location must be a non-empty string.');
  });

  it('throws an error when condition is an empty string', () => {
    expect(() => render(<WeatherCard location="Unknown" temperature={25} humidity={60} windSpeed={10} condition="" />)).toThrowError('Condition must be a non-empty string.');
  });

  it('throws an error when location is an empty string', () => {
    expect(() => render(<WeatherCard location="" temperature={25} humidity={60} windSpeed={10} condition="Sunny" />)).toThrowError('Location must be a non-empty string.');
  });
}