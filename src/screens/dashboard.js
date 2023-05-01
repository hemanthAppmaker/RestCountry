import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import  { Apifetch } from '../services/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Picker from '../components/Picker'
import ActivityIndicate from '../components/Activityind'
import SearchBar from '../components/Picker'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [Countries, setCountries] = useState([])
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
      fetchCountries()
  }, [Loading])

    const fetchCountries = async () => {
      /*
      * Will fetch all countries if async Store is empty
      * clear async store if any errors are encountered
      **/
      try{
          const StoreData =await AsyncStorage.getItem('CountryData')
          
          if(StoreData!==null){
            setCountries(JSON.parse(StoreData));
            setLoading(false)

          } else{
            const [data,err] = await Apifetch('all');

            if(data){
              setCountries(data);
              await AsyncStorage.setItem('CountryData',JSON.stringify(data));
              setLoading(false)

            }else {
              setLoading(false)
              AsyncStorage.clear();

            }
          }
      }catch(error){
        setLoading(false)
        AsyncStorage.clear();

      }
    }
      const onRefresh = () => {
        //set isRefreshing to true
        fetchCountries()
        setLoading(true)
        // and set isRefreshing to false at the end of your callApiMethod()
      }
      
      const renderItem = (countries,i) => { 
        const countriesList = countries?.item;
        //minimize the list of datasets
        const NativeNameList =countriesList.currencies && Object.keys(countriesList.currencies).map((code)=>{
          const currencyData= countriesList?.currencies[code]
          return(
            <>
              <View key={i} style={{flexDirection:'row',width:'90%',justifyContent:'space-between'}}>
                <Text style={styles.TextStyle}>{currencyData?.name}</Text>
               <Text style={styles.TextStyle}>{currencyData?.symbol}</Text>
              </View>
              </>
          )
        })
        return(
        <TouchableOpacity onPress={()=>navigation.navigate('CountryDetails',{countriesList})} style={{flex:1,width:'95%',alignSelf:'center',backgroundColor:'#D6E4E5',padding:10,marginBottom:15,borderRadius:10}}>
          <Text key={(countriesList?.name?.common).toString()} style={styles.TextStyle}>{countriesList?.name?.common}</Text>
          <View>
            {NativeNameList}
          </View>
          <Text style={styles.TextStyle}>{countriesList?.capital}</Text>
          <Text style={styles.TextStyle}>{countriesList?.region}</Text>
        </TouchableOpacity>
        )
       }

       if(Loading){
        return <ActivityIndicate isLoading={Loading}/>
       }

  return (
    <View style={{flex:1,padding:10,backgroundColor:'#ffff'}}>
      
      <FlatList
        data={Countries}
        scrollsToTop={true}
        extraData={Countries}
        keyExtractor={(_,index) => index}
        renderItem={renderItem}
        ListHeaderComponent={<SearchBar setSearchValue={setCountries} />}
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