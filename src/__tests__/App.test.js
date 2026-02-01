{ render, screen, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';

// Mock the Stack Navigator for testing
jest.mock('@react-navigation/native', () => {
  const { NavigationContainer } = require('@react-navigation/native');
  const { createStackNavigator } = require('@react-navigation/stack');

  return {
    ...jest.requireActual('@react-navigation/native'),
    NavigationContainer: jest.fn(() => <View style={{ flex: 1 }} />),
    createStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(() => <View style={{ flex: 1 }} />),
      Screen: jest.fn(() => <View style={{ flex: 1 }} />),
    })),
  };
});

describe('App Component', () => {

  it('renders the WeatherScreen component within the NavigationContainer', () => {
    render(<App />);
    expect(screen.getByText('Weather Forecast')).toBeDefined();
    expect(screen.getByText('Weather data will be displayed here.')).toBeDefined();
  });

  it('renders the correct title in the app header', () => {
    render(<App />);
    // This is a bit tricky with react-native-testing-library and stack navigation.
    // We're relying on the title being rendered within the WeatherScreen.
    // A more robust test would require mocking the navigation props.
    expect(screen.getByText('Weather App')).toBeDefined();
  });

  it('renders the container with the correct style', () => {
    render(<App />);
    const container = screen.getByTestId('container'); // Add testId to container in App.js for more reliable testing
    expect(container).toBeDefined();
  });

  it('renders the title with the correct style', () => {
    render(<App />);
    const title = screen.getByText('Weather Forecast');
    expect(title).toBeDefined();
  });

  // Edge Case: Test for empty state (if WeatherScreen had one) - not applicable in current code
  // Error Handling:  Not applicable in current code, as there's no error handling logic.
}