import * as React from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Convert"
        onPress={() => navigation.navigate('Convert')}
      />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}

function ConvertScreen({ navigation }) {
  const [value, onChangeText] = React.useState('0');
  return (
    <View style={{flex:1}}>
      <View style={{flex:5, flexDirection:'colunm'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.convert_text}>Kilometer/Hour</Text>
        </View>
        <View style={{flex:3, flexDirection:'row', alignItems: 'center'}}>
          <View style={{flex:2}}>
            <TextInput
              style={styles.text_input}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
          </View>
          <View style={{flex:1, alignItems: 'center'}}>
            <Text style={styles.convert_text}>km/h</Text>
          </View>
        </View>
        <View style={{flex:1}}></View>
      </View>

      <View style={{flex:5, flexDirection:'colunm'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.convert_text}>Mile/Hour</Text>
        </View>
        <View style={{flex:3, flexDirection:'row', alignItems: 'center'}}>
          <View style={{flex:2}}>
            <TextInput
              style={styles.text_input}
              onChangeText={text => onChangeText(text)}
            />
          </View>
          <View style={{flex:1, alignItems: 'center'}}>
            <Text style={styles.convert_text}>mph</Text>
          </View>
        </View>
      </View>

      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
        <View style={{flex:1}}>
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={{flex:1}}>
          <Button
            title="Convert"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text>I am a metrics conversion app. You can enter the metric you want to convert, such as kilometers</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://pic.pngbag.com/00/39/20/911ff14ce26ab64d.jpg',
        }}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  convert_text: {
    fontSize: 35,
    fontFamily: 'Arial',
    color: 'black',
  },
  text_input: {
    height: 40, 
    borderColor: 'white', 
    borderWidth: 1 ,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Convert') {
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Convert" component={ConvertScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}