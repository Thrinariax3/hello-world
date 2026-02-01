{ render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import LocationInput from '../components/LocationInput';
import { Alert } from 'react-native';

// Mock the Alert function to prevent actual alerts during testing
jest.mock('react-native', () => {
  const originalReactNative = jest.requireActual('react-native');
  return {
    ...originalReactNative,
    Alert: {
      alert: jest.fn(),
    },
  };
});

// Mock the fetchWeatherData function
jest.mock('../components/LocationInput', () => ({
  ...jest.requireActual('../components/LocationInput'),
  fetchWeatherData: jest.fn(),
}));

describe('LocationInput Component', () => {

  // Unit Tests - Toxic Shot (Direct Hits)
  it('renders correctly', () => {
    render(<LocationInput onWeatherDataFetched={() => {}} />);
    expect(screen.getByPlaceholderText('Enter city or zip code')).toBeOnTheScreen();
    expect(screen.getByText('Get Weather')).toBeOnTheScreen();
  });

  it('updates location state when text changes', () => {
    render(<LocationInput onWeatherDataFetched={() => {}} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    fireEvent.changeText(input, 'London');
    expect(input).toHaveValue('London');
  });

  // Integration Tests - Blinding Dart (System Integration)
  it('calls onWeatherDataFetched with weather data on successful API call', async () => {
    const mockWeatherData = { location: 'Test City', temperature: 25, condition: 'Sunny' };
    const onWeatherDataFetched = jest.fn();

    fetchWeatherData.mockResolvedValue(mockWeatherData);

    render(<LocationInput onWeatherDataFetched={onWeatherDataFetched} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'Test City');
    fireEvent.press(button);

    await waitFor(() => {
      expect(onWeatherDataFetched).toHaveBeenCalledWith(mockWeatherData);
    });
  });

  // Edge Case Tests - Mushroom Traps (Hidden in Unexpected Places)
  it('shows an error alert when submitting an empty location', async () => {
    render(<LocationInput onWeatherDataFetched={() => {}} />);
    const button = screen.getByText('Get Weather');
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter a location.');
    });
  });

  it('handles API errors and shows an error alert', async () => {
    const onWeatherDataFetched = jest.fn();
    fetchWeatherData.mockRejectedValue(new Error('API Error'));

    render(<LocationInput onWeatherDataFetched={onWeatherDataFetched} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'Error');
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to fetch weather data. Please try again.');
    });
  });

  it('handles specific error location "error"', async () => {
    const onWeatherDataFetched = jest.fn();
    fetchWeatherData.mockRejectedValue(new Error('Failed to fetch weather data for this location.'));

    render(<LocationInput onWeatherDataFetched={onWeatherDataFetched} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'error');
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to fetch weather data. Please try again.');
    });
  });

  // Error Handling Tests - Move Quick (Escape Routes)
  it('logs errors to the console when fetchWeatherData throws an error', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    fetchWeatherData.mockRejectedValue(new Error('Test Error'));

    render(<LocationInput onWeatherDataFetched={() => {}} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'Test');
    fireEvent.press(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
}