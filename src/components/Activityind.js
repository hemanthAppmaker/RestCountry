import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ActivityIndicate = ({isLoading}) => {

    if(!isLoading) return;

    return (
        <View style={{justifyContent:'center'}}>
            <ActivityIndicator
              size="small"
              animating={true}
              color={'#EB6440'}
              style={styles.activityIndicator}
            />
        </View>
      )
}

export default ActivityIndicate

const styles = StyleSheet.create({
    activityIndicator:{backgroundColor:'transparent'}
})