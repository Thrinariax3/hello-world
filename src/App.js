{ StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Define the stack navigator
const Stack = createStackNavigator();

// Placeholder for Weather Screen (to be implemented later)
const WeatherScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      <Text>Weather data will be displayed here.</Text>
    </View>
  );
};

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather">
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'Weather App' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}