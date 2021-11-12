import React from "react";
import { SafeAreaView } from 'react-native'
const ScreenTemplate = ({myinfo}) => {
  return (
    <SafeAreaView style={{flex:1}}>
      {myinfo}
    </SafeAreaView>
  )
}
export default ScreenTemplate