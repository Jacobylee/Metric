import * as React from 'react';
import { Text, View, Image, StyleSheet, Button, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from '../components/valuecontext';

export default function ConverMenuScreen({ navigation }) {
    // initialization
    const [history, setHistory] = React.useState([]);
    const {currentValue} = useValue()
    const dataset = currentValue
    var onpresses = Object.keys(dataset)
    var first = history[history.length-1]
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
                <Image 
                    style={styles.tinyLogo}
                    source={image}/>
                </Pressable>
                <Text style={styles.text}>{title}</Text>
            </View>
        );
    }
    function ButtonLine(props) {
        const { onPresses, style } = props;     // list, style
        const first = onPresses[0];
        const second = onPresses[1];
        const third = onPresses[2];

        return (
            <View style={{ flex: 3, flexDirection:'row'}}>
                <BigButton 
                    title={dataset[first]['title']} 
                    image={dataset[first]['image']} 
                    style={style} 
                    onPress = {() => {
                        navigation.navigate('Calculate', {
                        model: first,
                        });
                        history.push(first);
                        storeData({recent:history});
                    }}></BigButton>
                <BigButton 
                    title={dataset[second]['title']} 
                    image={dataset[second]['image']} 
                    style={style} 
                    onPress = {() => {
                        navigation.navigate('Calculate', {
                        model: second,
                        });
                        history.push(second);
                        storeData({recent:history});
                    }}></BigButton>
                <BigButton 
                    title={dataset[third]['title']} 
                    image={dataset[third]['image']} 
                    style={style} onPress = {() => {
                        navigation.navigate('Calculate', {
                        model: third,
                        });
                        history.push(third);
                        storeData({recent:history});
                    }}></BigButton>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, flexDirection:'column' }}>
            <View style={{backgroundColor:'white', flex: 20}}>
                {history.length==0
                ?<View></View>
                :<View style={{ flex: 4}}>
                    <View style={styles.banner}>
                        <Text style={{fontSize: 15}}>  Last Used</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection:'row'}}>
                        <BigButton 
                            title={dataset[first]['title']} 
                            image={dataset[first]['image']} 
                            style={styles.button} onPress = {() => {
                                navigation.navigate('Converter', {
                                model: first,
                                });
                            }}></BigButton>
                    </View>
                </View>
                }
                <View style={styles.banner}>
                    <Text style={{fontSize: 15}}>  Common Metrics</Text>
                </View>
                <ButtonLine style={styles.button} onPresses ={onpresses.slice(0,3)}></ButtonLine>
                <ButtonLine style={styles.button} onPresses ={onpresses.slice(3,6)}></ButtonLine>
                <ButtonLine style={styles.button} onPresses ={onpresses.slice(6,9)}></ButtonLine>
                <ButtonLine style={styles.button} onPresses ={onpresses.slice(9,12)}></ButtonLine>
                <ButtonLine style={styles.button} onPresses ={onpresses.slice(12,15)}></ButtonLine>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 6,
        elevation: 3,
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