import React from "react";
import { SafeAreaView } from 'react-native'
const ScreenTemplate = ({myinfo}) => {
  return (
    <SafeAreaView style={[{justifyContent:'center', backgroundColor:'tomato', height:'30%', width:'90%', borderRadius:20},
    {
      shadowColor: 'black',
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height:0},
  }]}>
      {myinfo}
    </SafeAreaView>
  )
}
export default ScreenTemplate