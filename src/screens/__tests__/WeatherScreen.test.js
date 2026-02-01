{ render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import WeatherScreen from '../screens/WeatherScreen';
import { ActivityIndicator, Text } from 'react-native';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      name: 'London',
      sys: { country: 'GB' },
      main: { temp: 15 },
      weather: [{ description: 'Clear sky' }],
    }),
  })
);

describe('WeatherScreen', () => {

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading indicator and text while fetching data', async () => {
    render(<WeatherScreen />);
    expect(screen.getByTestId('loading-indicator')).toBeDefined();
    expect(screen.getByText('Loading Weather...')).toBeDefined();
  });

  it('renders weather data when fetch is successful', async () => {
    render(<WeatherScreen />);
    await waitFor(() => {
      expect(screen.getByText('London, GB')).toBeDefined();
      expect(screen.getByText('15°C')).toBeDefined();
      expect(screen.getByText('Clear sky')).toBeDefined();
    });
  });

  it('renders error message when fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));
    render(<WeatherScreen />);
    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeDefined();
    });
  });

  it('renders "No weather data available" when weatherData is null', () => {
    render(<WeatherScreen />);
    // Mock fetch to resolve with null weatherData
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });
    render(<WeatherScreen />);
    expect(screen.getByText('No weather data available.')).toBeDefined();
  });

  it('displays the correct city, temperature, and description', async () => {
    render(<WeatherScreen />);
    await waitFor(() => {
      expect(screen.getByText('London, GB')).toBeDefined();
      expect(screen.getByText('15°C')).toBeDefined();
      expect(screen.getByText('Clear sky')).toBeDefined();
    });
  });

  it('renders the GIF', () => {
    render(<WeatherScreen />);
    const gifElement = screen.getByTestId('weather-gif');
    expect(gifElement).toBeDefined();
  });

  // Edge Case: Mock fetch to return an empty object
  it('handles empty weather data gracefully', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    render(<WeatherScreen />);
    await waitFor(() => {
      expect(screen.getByText('No weather data available.')).toBeDefined();
    });
  });

  // Error Handling: Mock fetch to throw an error after a delay
  it('handles delayed fetch errors', async () => {
    global.fetch.mockImplementation(() =>
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Delayed network error')), 1000);
      })
    );
    render(<WeatherScreen />);
    await waitFor(() => {
      expect(screen.getByText('Error: Delayed network error')).toBeDefined();
    });
  });
}