import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import LogoScreens from './src/screens/LogoScreen';
import SplashScreen from './src/screens/SplashScreen';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import TicketScreen from './src/screens/TicketScreen';
import UserAccountScreen from './src/screens/UserAccountScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_left'
        }} initialRouteName='LogoScreens'>
        <Stack.Screen
          name="LogoScreens"
          component={LogoScreens}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="TicketScreen"
          component={TicketScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="UserAccountScreen"
          component={UserAccountScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{animation: 'simple_push'}}
        />
        <Stack.Screen
          name="User"
          component={UserAccountScreen}
          // options={{animation: 'simple_push'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
