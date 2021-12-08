import * as React from 'react';
import { View, Text, Image } from 'react-native';

export default function HomeScreen({ navigation }) {  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E7E0E0' }}>
            <Image style={{width: 400, height: 400,}}
                    source={require("../assets/phone.gif")}/>
            <Text style={{fontFamily:'GillSans-BoldItalic', color:'tomato', fontSize:30, marginTop:60, width:'100%'}}>     The Best App</Text>
            <Text style={{fontFamily:'GillSans-BoldItalic', color:'tomato', fontSize:30, width:'100%'}}>           Save Your Life</Text>
        </View>
    )
}
