{ render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import LocationInput from '../components/LocationInput';
import { Alert } from 'react-native';

// Mock the Alert component
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: {
    alert: jest.fn(),
  },
}));

describe('LocationInput Component', () => {

  // Unit Tests - Toxic Shot (Direct Hits)
  it('renders correctly', () => {
    render(<LocationInput />);
    expect(screen.getByPlaceholderText('Enter city or zip code')).toBeDefined();
    expect(screen.getByText('Get Weather')).toBeDefined();
  });

  it('updates location state on text input change', () => {
    render(<LocationInput />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    fireEvent.changeText(input, 'London');
    expect(input).toHaveValue('London');
  });

  // Integration Tests - Blinding Dart (System Integration)
  it('calls onWeatherDataFetched with weather data on successful API call', async () => {
    const mockOnWeatherDataFetched = jest.fn();
    render(<LocationInput onWeatherDataFetched={mockOnWeatherDataFetched} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'TestLocation');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockOnWeatherDataFetched).toHaveBeenCalledTimes(1);
    });
  });

  // Edge Case Tests - Mushroom Traps (Hidden in Unexpected Places)
  it('shows an error alert when submitting an empty location', async () => {
    render(<LocationInput />);
    const button = screen.getByText('Get Weather');
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Please enter a location.'
      );
    });
  });

  it('handles API error and shows an error alert', async () => {
    render(<LocationInput />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'error');
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Failed to fetch weather data. Please try again.'
      );
    });
  });

  // Error Handling Tests - Move Quick (Escape Routes)
  it('logs errors to the console when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(<LocationInput />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'error');
    fireEvent.press(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error in LocationInput:', new Error('Failed to fetch weather data for this location.'));
    });

    consoleSpy.mockRestore();
  });

  it('correctly handles a valid location and calls the callback', async () => {
    const mockOnWeatherDataFetched = jest.fn();
    render(<LocationInput onWeatherDataFetched={mockOnWeatherDataFetched} />);
    const input = screen.getByPlaceholderText('Enter city or zip code');
    const button = screen.getByText('Get Weather');

    fireEvent.changeText(input, 'ValidLocation');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockOnWeatherDataFetched).toHaveBeenCalledTimes(1);
      expect(mockOnWeatherDataFetched).toHaveBeenCalledWith(expect.objectContaining({
        location: 'ValidLocation',
      }));
    });
  });
}