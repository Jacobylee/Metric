import * as React from 'react';
import { Text, View, Linking, FlatList, Image } from 'react-native';
import ScreenTemplate from '../container/info';
import { useValue } from '../components/valuecontext';

export default function AboutScreen() {
    const info = <View style={{ flexDirection:'column', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{fontSize:20, fontFamily:"GillSans-BoldItalic", color:'white'}}> 🤪 Author: Xiangyu Li</Text>
                    <Text></Text>
                    <Text style={{fontSize:20, fontFamily:"GillSans-BoldItalic", color:'white'}}> 🎓 Brandeis University</Text>
                    <Text></Text>
                    <Text style={{fontSize:20, fontFamily:"GillSans-BoldItalic", color:'white'}} onPress={() => Linking.openURL('https://github.com/Jacobylee/COSI-153-Metric')}
                        > 👉 Github: Click Me</Text>
                </View>

    const {currentValue} = useValue()
    const dataset = currentValue

    const renderItem = ({ item }) => {
        const title = dataset[item]['title']
        const image = dataset[item]['image']
        return (
            <View style={{
                alignItems:'center', 
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:5,
                marginTop:5,
            }}>     
                <Image 
                    style={{width: 50, height: 50,}}
                    source={image}/>
                <View style={{alignItems:'center', width:'60%'}}>
                    <Text style={{
                            fontSize: 16,
                            lineHeight: 21,
                            fontWeight: 'bold',
                            letterSpacing: 0.25,
                            fontFamily:"GillSans-BoldItalic", color:'tomato',}}>{title}</Text>
                </View>
            </View>
        );
    };      

    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <ScreenTemplate myinfo={info}>
            </ScreenTemplate>
            <View style={[{backgroundColor:'white',  borderRadius:20, width:'90%', height:'60%', marginTop:'6%'},
                    {
                    shadowColor: 'black',
                    shadowRadius: 5,
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 0, height:0},
                }]}>
                <FlatList
                    data={Object.keys(dataset).splice(10)}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    style={{}}
                />
            </View>
        </View>
    )
}