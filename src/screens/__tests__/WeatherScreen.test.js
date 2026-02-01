{ render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import WeatherScreen from '../screens/WeatherScreen';
import { ActivityIndicator, Text } from 'react-native';

// Mock the fetch API
global.fetch = jest.fn();

describe('WeatherScreen', () => {

  // Unit Tests - Toxic Shot (Direct Hits)
  it('renders loading indicator and text when loading', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<WeatherScreen />);
    expect(screen.getByTestId('loading-indicator')).toBeDefined();
    expect(screen.getByText('Loading Weather...')).toBeDefined();
  });

  it('renders error message when fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    render(<WeatherScreen />);
    await waitFor(() => expect(screen.getByText('Error: Network error')).toBeDefined());
  });

  it('renders "No weather data available" when weatherData is null', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });

    render(<WeatherScreen />);
    expect(screen.getByText('No weather data available.')).toBeDefined();
  });

  // Integration Tests - Blinding Dart (System Integration)
  it('renders weather data correctly when fetch is successful', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      main: { temp: 15 },
      weather: [{ description: 'Clear sky' }],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    });

    render(<WeatherScreen />);
    await waitFor(() => expect(screen.getByText('London, GB')).toBeDefined());
    await waitFor(() => expect(screen.getByText('15°C')).toBeDefined());
    await waitFor(() => expect(screen.getByText('Clear sky')).toBeDefined());
  });

  // Edge Case Tests - Mushroom Traps (Hidden in Unexpected Places)
  it('handles empty weather description gracefully', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      main: { temp: 15 },
      weather: [{ description: '' }],
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    });

    render(<WeatherScreen />);
    await waitFor(() => expect(screen.getByText('London, GB')).toBeDefined());
    await waitFor(() => expect(screen.getByText('15°C')).toBeDefined());
    await waitFor(() => expect(screen.getByText('')).toBeDefined());
  });

  it('handles missing weather data fields gracefully', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: {},
      main: { temp: 15 },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    });

    render(<WeatherScreen />);
    await waitFor(() => expect(screen.getByText('London')).toBeDefined());
    await waitFor(() => expect(screen.getByText('15°C')).toBeDefined());
  });

  // Error Handling Tests - Move Quick (Escape Routes)
  it('displays a user-friendly error message when the API returns a non-200 status code', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    render(<WeatherScreen />);
    await waitFor(() => expect(screen.getByText('Error: HTTP error! Status: 404')).toBeDefined());
  });

  it('correctly sets loading to false even when an error occurs', async () => {
    fetch.mockRejectedValue(new Error('API Error'));

    render(<WeatherScreen />);
    await waitFor(() => expect(screen.getByText('Error: API Error')).toBeDefined());
    expect(screen.queryByTestId('loading-indicator')).toBeNull();
  });
}