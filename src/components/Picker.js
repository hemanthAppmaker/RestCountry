import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Apifetch } from '../services/axios';
import debounce from 'lodash.debounce';
import ActivityIndicate from './Activityind';

    const SearchBar = (props) => {
      
        const { setSearchValue }=props;

        const [inputValue, setInputValue] = useState('');
        const [isLoading, setisLoading] = useState(false);
       
        // if(inputValue!=='') {setisLoading(true)}
          // const handleSearch = async (inputValue) => {
          //   if(!inputValue){
          //     setInputValue([]);
          //     return
          //   }
          //   try{
          //     const [data,err] = await Apifetch('region/'+inputValue);
          //     if (data){
          //       setSearchValue(data);
          //       // setisLoading(false)
          //     }
          //   } catch(error){
          //     if(error){
          //       console.log('request Failed: ' + error);
          //     }
          //   }finally{

          //   }
          // };

          /* add debonce to avoid unessecary api calls */
            const handleSearch =useCallback(
              debounce(async(inputValue) => {
                if(!inputValue){
                  setisLoading(false);
                  setInputValue('');
                  return
                }
                try {
                  const [data, err] = await Apifetch('region/' + inputValue);
                  if (data) {
                    setSearchValue(data);
                  setisLoading(false);

                  }
                } catch (error) {
                  setSearchValue([]);
                  setisLoading(false);

                } 
              }, 500),
            [inputValue]
            )

        const onChangeText = (e) => { 
          setInputValue(e)
          setisLoading(true);

          if(e.lenght !== '') handleSearch(e)
         }
        return (
          <View style={{flexDirection:'row',width:'95%',padding:10,justifyContent:'space-between',borderWidth:1,borderColor:'#EB6440',backgroundColor:'#D6E4E5',margin:10,borderRadius:30}}>
              <View style={{alignSelf:'center',backgroundColor:'transparent'}}>
              <TextInput
                placeholder={"Enter a region name"}
                onChangeText={onChangeText}
                // value={inputValue}
                defaultValue={inputValue}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    setInputValue('')
                    setisLoading(true);

                  }
                }}  
              />
              </View>
              {isLoading ?<ActivityIndicate isLoading={isLoading}/> :
               <TouchableOpacity onPress={handleSearch(inputValue)} style={{backgroundColor:'#EB6440',padding:10,borderRadius:30}}>
                 <Text>Search</Text>
               </TouchableOpacity>}
            </View>

        );
      };
      
      
   
  

export default SearchBar