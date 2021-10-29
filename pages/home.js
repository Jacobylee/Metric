import * as React from 'react';
import { Button, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
            title="Go to Convert"
            onPress={() => navigation.navigate('Home')}
        />
        <Button
            title="Go to About"
            onPress={() => navigation.navigate('About')}
        />
        </View>
    )
}