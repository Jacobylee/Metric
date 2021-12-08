import * as React from 'react';
import { NavigationContainer, Button } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutScreen from './pages/about';
import HomeScreen from './pages/home';
import ConverMenuScreen from './pages/convert_menu';
import ConvertorRender from './pages/convertor';
import data from './assets/dataset';
import ValueProvider from './components/valuecontext'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ConvertPart() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Converter" component={ConverMenuScreen}/>
      <Stack.Screen name="Calculate" component={ConvertorRender} options={{headerBackTitleVisible:false}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  var dataset = new data()
  return (
    <ValueProvider value={dataset}>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Welcome') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Home') {
                iconName = focused 
                  ? 'ios-list' 
                  : 'ios-list';
              } else if (route.name === 'About') {
                iconName = focused 
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Welcome" component={HomeScreen} />
          <Tab.Screen name="Home" component={ConvertPart} options={{ headerShown: false }}/>
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
}

