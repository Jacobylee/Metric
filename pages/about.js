import * as React from 'react';
import { Text, View, Image } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text>I am a metrics conversion app. You can enter the metric you want to convert, such as kilometers</Text>
            <Image
                style={{width: 50, height: 50}}
                source={{
                    uri: 'https://pic.pngbag.com/00/39/20/911ff14ce26ab64d.jpg',
                }}
            />
        </View>
    )
}