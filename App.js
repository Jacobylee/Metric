import * as React from 'react';
import { Text, View, Button, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Convertor from './components/Convertor';
import data from './assets/dataset';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  // initialization
  var dataset = new data()
  var onpresses = Object.keys(dataset)
  let convertorView = <View></View>
  const [model, setModel] = React.useState("");
  const [history, setHistory] = React.useState([]);
  // useEffect
  React.useEffect(() => {getData()}, [])
  // Async
  const storeData = async (value) => {
      try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@history', jsonValue)
          console.log('just stored ' + jsonValue)
      } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
      }
  }
  const getData = async () => {
      try {
          const jsonValue = await AsyncStorage.getItem('@history')
          let data = null
          if (jsonValue!=null) {
              data = JSON.parse(jsonValue)
              setHistory(data[recent])
              console.log('just set history')
          } else {
              setHistory([])
              console.log('history: just read a null value from Storage')
          }
      } catch(e) {
        console.log("error in get history Data ")
        console.dir(e)
      }
  }
  // helper function
  function BigButton(props) {
    const { onPress, title, style, image } = props;
    return (
      <View style={styles.item}>
          <Pressable style={style} onPress={onPress}>
            <Image style={styles.tinyLogo}
                source={image}/>
          </Pressable>
          <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
  function ButtonLine(props) {
    const { onPresses, style } = props;
    const first = onPresses[0];
    const second = onPresses[1];
    const third = onPresses[2];
    return (
      <View style={{ flex: 3, flexDirection:'row'}}>
        <BigButton title={dataset[first]['title']} image={dataset[first]['image']} style={style} onPress = {() => setModel(first)}></BigButton>
        <BigButton title={dataset[second]['title']} image={dataset[second]['image']} style={style} onPress = {() => setModel(second)}></BigButton>
        <BigButton title={dataset[third]['title']} image={dataset[third]['image']} style={style} onPress = {() => setModel(third)}></BigButton>
      </View>
    );
  }
  // page convert logic
  if (model!="") {
    // store data
    history.push(model)
    const recent = {recent:history}
    storeData(recent)
    convertorView = 
      <View style={{ flex:14 }}>
        <View style={{ flex:11 }}>
          <Convertor _var={model}></Convertor>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex:3 }}>
          <Pressable style={{ backgroundColor:'grey', height:60, width:150, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} onPress={() => setModel('')}>
            <Text style={styles.text}>BACK</Text>
          </Pressable>
        </View>
      </View>
  } else {
    var first = history[history.length-1]
    convertorView = 
      <View style={{backgroundColor:'white', flex: 20}}>
        {history.length==0
          ?<View></View>
          :<View style={{ flex: 4}}>
            <View style={styles.banner}>
              <Text style={{fontSize: 15}}>  Last Used</Text>
            </View>
            <View style={{ flex: 3, flexDirection:'row'}}>
              <BigButton title={dataset[first]['title']} image={dataset[first]['image']} style={styles.button} onPress = {() => setModel(first)}></BigButton>
            </View>
          </View>
        }
        <View style={styles.banner}>
            <Text style={{fontSize: 15}}>  Common Converters</Text>
        </View>
        <ButtonLine style={styles.button} onPresses ={onpresses.slice(0,3)}></ButtonLine>
        <ButtonLine style={styles.button} onPresses ={onpresses.slice(3,6)}></ButtonLine>
        <ButtonLine style={styles.button} onPresses ={onpresses.slice(1,4)}></ButtonLine>
        <ButtonLine style={styles.button} onPresses ={onpresses.slice(2,5)}></ButtonLine>
        <ButtonLine style={styles.button} onPresses ={onpresses.slice(3,6)}></ButtonLine>
      </View>
  }
  // return
  return (
    <View style={{ flex: 1, flexDirection:'column' }}>
      {convertorView}
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 6,
    elevation: 3,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 62,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  item: { 
    alignItems:'center', 
    justifyContent:'space-around', 
    borderWidth:1, 
    borderColor:'#EFEEF3', 
    flex: 1,
  },
  banner: { 
    backgroundColor:'#EFEEF3', 
    flex: 1, 
    justifyContent:'space-around'
  }
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
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }}/>
        <Stack.Screen name="Convert" component={ConvertScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}