import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import PredictScreen from './screens/PredictScreen';
import WorldSalaryScreen from './screens/WorldSalaryScreen';
import SettingScreen from './screens/SettingScreen';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#1e90ff', // Change this to your desired background color
        borderTopWidth: 0, // Optional: removes the border line above the tab bar
      },
      tabBarActiveTintColor: '#fff', // Color for the active tab icon and label
      tabBarInactiveTintColor: '#ccc', // Color for the inactive tab icon and label
      tabBarLabelStyle: {
        fontSize: 14, // Font size of the tab labels
      },
      tabBarIconStyle: {
        size: 20, // Size of the tab icons
      },
    }}
  >
    <Tab.Screen 
      name="Predict" 
      component={PredictScreen} 
      options={{
        
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
           <MaterialCommunityIcons name="slot-machine-outline" size={24} color="white" /> // Change this to your desired icon
        ),
      }} 
    />
    <Tab.Screen 
      name="WorldSalary" 
      component={WorldSalaryScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Fontisto name="world-o" size={24} color="white" /> // Change this to your desired icon
        ),
      }} 
    />
    <Tab.Screen 
      name="setting" 
      component={SettingScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name="settings" size={24} color="white" /> // Change this to your desired icon
        ),
      }} 
    />
  </Tab.Navigator>
);

export default function App() {
  const [loaded] = useFonts({
    Ubuntu: require('./assets/fonts/Ubuntu-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
