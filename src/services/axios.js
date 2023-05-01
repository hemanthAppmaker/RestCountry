

import axios from 'axios';
import { BASE_URL, VERSION } from './constant';
import { ToastAndroid } from 'react-native';

const api= axios.create({
    baseURL:`${BASE_URL+VERSION}`,
    headers:{'content-type':'application/json'},
})

 const Apifetch = async(url) => {
    try{
        const response= await api.get(url)
        const countries= response.data
        return [countries,false]
    }catch(err){
        let err_in_endpoint=url.split('/')
        ToastAndroid.show('Invalid '+err_in_endpoint[0]+' ,please try again',ToastAndroid.SHORT)
        return [false,err]
    }
}
export {Apifetch};

