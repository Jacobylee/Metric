import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from "../assets/dataset";

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

const Convertor = ({_var}) => {
    const [input_num, setInput] = useState('0');
    const [lastone, setlast] = useState({last:0});

    const context = new Convert(_var);
    let input_context = context.getter[0];
    let rate_context = context.getter[1];
    let output_context = context.getter[2];
    let input_addr = context.getter[3];
    let output_addr = context.getter[4];
    // useEffect
    useEffect(() => {getData()}, [])
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
                setlast(data)
                setInput(data.last)
                console.log('just set input number')
            } else {
                setlast({})
                setInput(0)
                console.log('just read a null value from Storage')
            }
        } catch(e) {
            console.log("error in getData ")
            console.dir(e)
        }
    }
    return (
        <View style={{flex:1}}>
            <View style={{flex:5, flexDirection:'colunm'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.convert_text}>{input_context}</Text>
                </View>
                <View style={{flex:3, flexDirection:'row', alignItems: 'center'}}>
                <View style={{flex:2}}>
                    <TextInput
                        style={styles.text_input}
                        // keyboardType = 'numeric'
                        defaultValue='0'
                        value={input_num}
                        onChangeText={text => {setInput(text), setlast({last:text}),storeData({last:text})}}
                    />
                </View>
                <View style={{flex:1, alignItems: 'center'}}>
                    <Text style={styles.convert_text}>{input_addr}</Text>
                </View>
                </View>
                <View style={{flex:1}}></View>
            </View>

            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            </View>

            <View style={{flex:5, flexDirection:'colunm'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.convert_text}>{output_context}</Text>
                </View>
                <View style={{flex:2}}>
                    {_var=='cl_fa'
                        ?<Text style={styles.text_output}>{input_num*rate_context + 32}{output_addr}</Text>
                        :<Text style={styles.text_output}>{input_num*rate_context}{output_addr}</Text>
                    }
                </View>
            </View>
        </View>
    );
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
export default Convertor;