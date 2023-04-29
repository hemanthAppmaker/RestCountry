import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import  { Apifetch } from '../services/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Picker from '../components/Picker'
import ActivityIndicate from '../components/Activityind'

const HomeScreen = () => {
    const [Countries, setCountries] = useState([])
    const [Currency, setCurrencies] = useState('')
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
       fetchCountries()
    }, [Countries])

    const fetchCountries = useCallback(async () => {
      setLoading(true)
      try{
          const StoreData =await AsyncStorage.getItem('CountryData')
          
          if(StoreData!==null){
            console.log(StoreData);
            setCountries(JSON.parse(StoreData));
          } else{
            const [data,err] = await Apifetch('all');

            if(data){
              setCountries(data);
              await AsyncStorage.setItem('CountryData',JSON.stringify(data));
              setLoading(false)

            }else {
              console.log('error fetching countries');
              AsyncStorage.clear();
              setLoading(false)

            }
          }
      }catch(error){
        console.log(error);
        setLoading(false)

      }
      
      },[])
      const handleSelectCountry = (country) => {
        onSelectCountry(country);
        };
    const CountryList = ({ data, onSelectCountry }) => {
       
      const countriesList = countries.item
      //minimize the list of datasets

      for (const currencies in countriesList.currencies){
        setCurrencies(countriesList.currencies[currencies])
      }
        const renderItem = ({ item }) => {
        return(
        <TouchableOpacity onPress={() => handleSelectCountry(item)} style={{flex:1,backgroundColor:'#AFD3E2',padding:10,marginBottom:10,borderRadius:10}}>
          <Text style={styles.TextStyle}>{countriesList.name.common}</Text>
          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
          <Text style={styles.TextStyle}>{Currency.name}</Text>
          <Text style={styles.TextStyle}>{Currency.symbol}</Text>
          </View>
          <Text style={styles.TextStyle}>{countriesList.capital}</Text>
        </TouchableOpacity>
        );
    }
      return (
          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.alpha2Code}
          />
      );
  };

      const onRefresh = () => {
        //set isRefreshing to true
        fetchCountries()
        // and set isRefreshing to false at the end of your callApiMethod()
      }
      const renderItem = (countries,i) => { 
        const countriesList = countries.item
        //minimize the list of datasets

        for (const currencies in countriesList.currencies){
          setCurrencies(countriesList.currencies[currencies])
        }

        return(
        <View style={{flex:1,backgroundColor:'#AFD3E2',padding:10,marginBottom:10,borderRadius:10}}>
          <Text style={styles.TextStyle}>{countriesList.name.common}</Text>
          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
          <Text style={styles.TextStyle}>{Currency.name}</Text>
          <Text style={styles.TextStyle}>{Currency.symbol}</Text>
          </View>
          <Text style={styles.TextStyle}>{countriesList.capital}</Text>
        </View>
        )
       }
  return (
    <View style={{flex:1,padding:10}}>
      {/* <ActivityIndicate isLoading={Loading}/> */}
      <FlatList
      data={Countries}
      scrollsToTop={true}
      extraData={Countries}
      
      keyExtractor={(_,index) => index}
      renderItem={renderItem}
      ListHeaderComponent={Picker}
      stickyHeaderIndices={[0]}
      onRefresh={onRefresh}
      refreshing={Loading}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  TextStyle:{margin:5}
})
export default HomeScreen