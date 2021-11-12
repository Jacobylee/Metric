import * as React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { useValue } from '../components/valuecontext';

export default function HomeScreen({ navigation }) {  
    const {currentValue} = useValue()
    const dataset = currentValue

    const renderItem = ({ item }) => {
        const title = dataset[item]['title']
        const image = dataset[item]['image']
        return (
            <View style={{
                alignItems:'center', 
                flexDirection:'row',
                justifyContent:'space-around', 
                }}>     
                <Image 
                    style={{width: 50, height: 50,}}
                    source={image}/>
                <Text style={{
                        width:'60%',
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        color: 'black',}}>{title}</Text>
            </View>
        );
    };      

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This app could help you to convert these measurements</Text>
            <FlatList
                data={Object.keys(dataset)}
                renderItem={renderItem}
                keyExtractor={item => item}
            />
        </View>
    )
}
