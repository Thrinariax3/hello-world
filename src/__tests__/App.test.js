{ render, screen, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';

// Mock the Stack Navigator for isolated testing
jest.mock('@react-navigation/native', () => {
  const { NavigationContainer } = jest.requireActual('@react-navigation/native');
  return {
    ...jest.requireActual('@react-navigation/native'),
    NavigationContainer: jest.fn().mockImplementation(({ children }) => children),
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn().mockImplementation(({ children }) => children),
      Screen: jest.fn().mockImplementation(({ component, name, options }) => component),
    }),
  };
});

describe('App Component', () => {

  // Unit Test: Initial Render - Verify Weather Screen is rendered
  it('renders the Weather Screen initially', () => {
    render(<App />);
    const weatherTitle = screen.getByText('Weather Forecast');
    const weatherText = screen.getByText('Weather data will be displayed here.');
    expect(weatherTitle).toBeDefined();
    expect(weatherText).toBeDefined();
  });

  // Unit Test: Verify Title Text
  it('renders the correct title text', () => {
    render(<App />);
    const titleElement = screen.getByText('Weather App');
    expect(titleElement).toBeDefined();
  });

  // Integration Test: Navigation Container - Check if NavigationContainer is rendered (mocked)
  it('renders the NavigationContainer', () => {
    render(<App />);
    expect(NavigationContainer).toHaveBeenCalledTimes(1);
  });

  // Integration Test: Stack Navigator - Check if Stack Navigator is rendered (mocked)
  it('renders the Stack Navigator', () => {
    render(<App />);
    expect(createStackNavigator).toHaveBeenCalledTimes(1);
  });

  // Edge Case Test:  Empty Weather Screen - Verify basic rendering even with minimal content
  it('renders correctly with minimal Weather Screen content', () => {
    const MockWeatherScreen = () => <View />;
    const AppWithMock = () => (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Weather">
          <Stack.Screen name="Weather" component={MockWeatherScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    render(<AppWithMock />);
    const container = screen.getByTestId('container'); // Assuming a container with testId is added in real app
    expect(container).toBeDefined();
  });

  // Error Handling Test:  No Initial Route -  (Simulate a missing initialRouteName - should still render something)
  it('renders without crashing if initialRouteName is missing (mocked)', () => {
    const MockStack = createStackNavigator;
    MockStack.mockReturnValue({
      Navigator: jest.fn().mockImplementation(({ children }) => children),
      Screen: jest.fn().mockImplementation(({ component, name, options }) => component),
    });

    const AppWithoutInitialRoute = () => (
      <NavigationContainer>
        <MockStack.Navigator>
          <MockStack.Screen name="Weather" component={() => <Text>Weather</Text>} />
        </MockStack.Navigator>
      </NavigationContainer>
    );

    render(<AppWithoutInitialRoute />);
    const weatherText = screen.getByText('Weather');
    expect(weatherText).toBeDefined();
  });
}