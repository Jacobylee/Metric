import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from "../assets/dataset";;

var dataset = new data()

class Convert {
    constructor(_type) {
        const pair = dataset[_type];
        this.input = pair['input_name'];
        this.rate = pair['rate'];
        this.output = pair['output_name'];
        this.in_addr = pair['in_addr'];
        this.out_addr = pair['out_addr'];
    }
    // getter
    get getter(){
        return [this.input, this.rate, this.output, this.in_addr, this.out_addr]
    }
}

function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

function Render(props) {
    // get type details
    const { model } = props.model;
    const context = new Convert(model);
    let input_context = context.getter[0];
    let rate_context = context.getter[1];
    let output_context = context.getter[2];
    let input_addr = context.getter[3];
    let output_addr = context.getter[4];
    // save user's input from last time
    const [input_num, setInput] = React.useState('0');
    // useEffect
    React.useEffect(() => {getData()}, [])
    // Async
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@lastinput', jsonValue)
            console.log('just stored ' + jsonValue)
        } catch (e) {
            console.log("last:error in storeData ")
            console.log(e)
            console.dir(e)
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@lastinput')
            let data = null
            if (jsonValue!=null) {
                data = JSON.parse(jsonValue)
                setInput(data.last)
                console.log('just set input number')
            } else {
                setInput('0')
                console.log('just read a null value from Storage')
            }
        } catch(e) {
            console.log("error in getData ")
            console.dir(e)
        }
    }
    let output;
    if (model=='cl_fa'){
        output=<Text style={styles.text_output}>{(input_num*rate_context + 32).toFixed(3)} {output_addr}</Text>
    }else if (model=='af_lc') {
        output=<Text style={styles.text_output}>{((input_num-32)*rate_context).toFixed(3) } {output_addr}</Text>
    }else{
        output=<Text style={styles.text_output}>{(input_num*rate_context).toFixed(3)} {output_addr}</Text>
    }
    
    return (
        <View style={{ flex:14, flexDirection:'column' }}>
            <View style={{ flex:11 }}>
                <View style={{flex:1}}>
                    {/* input part */}
                    <View style={{flex:5, flexDirection:'colunm'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.convert_text}>{input_context}</Text>
                        </View>
                        <View style={{flex:3, flexDirection:'row', alignItems: 'center'}}>
                            <TextInput
                                style={styles.text_input}
                                keyboardType = 'numeric'
                                defaultValue='0'
                                value={input_num}
                                autoFocus={true}
                                onChangeText={text => {setInput(text), storeData({last:text})}}
                            />
                            <Text style={styles.convert_text}> {input_addr}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    {/* auto output part */}
                    <View style={[{
                        flex:5, 
                        flexDirection:'colunm', 
                        backgroundColor:'#F2F2F2', 
                        borderRadius:20,
                        borderBottomLeftRadius:0,
                        borderBottomRightRadius:0,
                    }, {
                        shadowColor: 'black',
                        shadowRadius: 5,
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 0, height:-8},
                    }]}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.convert_text}>{output_context}</Text>
                        </View>
                        <View style={{flex:2}}>{output}</View>
                    </View>
                </View>
            </View>
            <View style={{flex:3}}></View>
        </View>
    )
}

export default function ConvertorRender({ route, navigation }) {
    const [metrictype, setType] = React.useState(route.params);
    return(
        <View style={{ flex:1 }}>
            <Pressable style={[{
                left:'75%',
                top:'35.5%',
                zIndex:1, 
                position: 'absolute', 
                backgroundColor:'white',
                width:'20%',
                height:'7%',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight:'1%',
                paddingVertical: 0,
                paddingHorizontal: 0,
                borderRadius: 60,
                elevation: 3}, {
                shadowColor: 'black',
                shadowRadius: 10,
                shadowOpacity: 0.2,
            }]} 
            onPress={() => {setType({model:reverseString(metrictype['model'])})}}
            >
                <Image style={{width: 25, height: 25,}}
                    source={require("../assets/transfer.png")}/>
            </Pressable>
            <Render model={metrictype} ></Render>
        </View>
    )
}

const styles = StyleSheet.create({
    convert_text: {
      fontSize: 35,
      fontFamily: 'Arial',
      color: 'black',
    },
    text_input: {
      height: 50, 
      fontSize: 40,
      borderWidth: 0 ,
    },
    text_output: {
      fontSize: 40,
    },
});