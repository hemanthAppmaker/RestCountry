

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, VERSION } from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api= axios.create({
    baseURL:`${BASE_URL+VERSION}`,
    headers:{'content-type':'application/json'},
})

export const Apifetch = async(url) => {
    try{
        const response= await api.get(url)
        const countries= response.data
        return [countries,false]
    }catch(err){
        console.log('error fetch');
        return [false,err]
    }
}

