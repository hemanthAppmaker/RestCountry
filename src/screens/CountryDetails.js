import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const CountryDetails = ({ route, navigation }) => {
  const {countriesList}=route.params;
const openMaps = (url) => { 
  Linking.openURL(url)
 }
    const nativeNameList = Object.keys(countriesList.name.nativeName).map((code)=>{
      return(
        <>
          <Text style={styles.TextStyle}>official: {countriesList.name.nativeName[code].official}</Text>
          <Text style={styles.TextStyle}>Common: {countriesList.name.nativeName[code].common}</Text>
          
        </>

      )
    })
  
  return (
    <View >
    <View key={(countriesList.name.common).toString()} style={styles.container}>
      <Text style={styles.TextStyle}>{countriesList.name.common}</Text>
      <Text style={styles.TextStyle}>{countriesList.capital}</Text>
      <Text style={styles.TextStyle}>{countriesList.region}</Text>
      <Text style={styles.TextStyle}>{countriesList.timezones}</Text>
      <Text style={styles.TextStyle}>{countriesList.population}</Text>
      {/* <Text>{countriesList.nativeName}</Text> */}
      {nativeNameList}
    </View>
    <TouchableOpacity onPress={()=>openMaps(countriesList.maps.googleMaps)} style={styles.MapsButton}>
            <Text>Open in Maps</Text>
          </TouchableOpacity>
    </View>

  )
}

export default CountryDetails

const styles = StyleSheet.create({
    container:{backgroundColor:'#D6E4E5',padding:10,marginBottom:10,borderRadius:10,margin:15},
    MapsButton:{backgroundColor:'#EB6440',padding:10,marginBottom:10,borderRadius:10,margin:15,justifyContent:'center',alignItems:'center'},
    TextStyle:{margin:10}
})