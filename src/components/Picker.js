import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Apifetch } from '../services/axios';
import ActivityIndicate from './Activityind';


    const SearchBar = (props) => {
      
        const { setSearchValue }=props;

        const [inputValue, setInputValue] = useState('');

          const handleSearch = async (inputValue) => {
            try{
              const [data,err] = await Apifetch('region/'+inputValue);
              if (data){
                setSearchValue(data);
              }
            } catch(error){
              if(error){
                console.log('request Failed: ' + error);
              }
            }
          };

        const onChangeText = (e) => { 
          setInputValue(e)
          if(e !== '') handleSearch(e)
         }
        return (
          <View style={{flexDirection:'row',width:'95%',padding:10,justifyContent:'space-between',borderWidth:1,borderColor:'#EB6440',backgroundColor:'#D6E4E5',margin:10,borderRadius:30}}>
              <View style={{alignSelf:'center',backgroundColor:'transparent'}}>
              <TextInput
                placeholder={"Enter a region name"}
                onChangeText={onChangeText}
                // value={inputValue}
                defaultValue={inputValue}
              />
              </View>

              <TouchableOpacity onPress={handleSearch} style={{backgroundColor:'#EB6440',padding:10,borderRadius:30}}>
                <Text>Search</Text>
              </TouchableOpacity>
            </View>

        );
      };
      
      
   
  

export default SearchBar