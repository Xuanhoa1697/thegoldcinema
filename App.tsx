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
import CinemaHomeScreen from './src/screens/CinemaHome';
import TrailerScreen from './src/screens/TrailerScreen';
import DetaiCinemaScreen from './src/screens/DetaiCinema';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal'
        }} initialRouteName='LogoScreens'>
        <Stack.Screen
          name="LogoScreens"
          component={LogoScreens}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="TicketScreen"
          component={TicketScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="UserAccountScreen"
          component={UserAccountScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="User"
          component={UserAccountScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="CinemaHomeScreen"
          component={CinemaHomeScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="TrailerScreen"
          component={TrailerScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="DetaiCinemaScreen"
          component={DetaiCinemaScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
