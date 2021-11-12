import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import ScreenTemplate from '../container/info';

export default function AboutScreen() {
    const info = <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize:20}}> 🤪 Author: Xiangyu Li</Text>
                    <Text></Text>
                    <Text style={{fontSize:20}}> 🎓 Brandeis University</Text>
                    <Text></Text>
                    <Text style={{fontSize:20}} onPress={() => Linking.openURL('https://github.com/Jacobylee/COSI-153-Metric')}
                    > 👉 Github: Click Me</Text>
                </View>
    return (
        <View style={{flex:1}}>
        <ScreenTemplate myinfo={info}>
        </ScreenTemplate>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>This app is used for measurement convertion</Text>
            </View>
        </View>
    )
}