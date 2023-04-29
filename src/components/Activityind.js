import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ActivityIndicate = (isLoading,isFetching) => {
    return (
        <View style={{backgroundColor:'transparent'}}>
          {(isLoading) && (
            <ActivityIndicator
              size="large"
              animating={true}
              color={'#146C94'}
              style={styles.activityIndicator}
            />
          )}
        </View>
      )
}

export default ActivityIndicate

const styles = StyleSheet.create({
    activityIndicator:{backgroundColor:'transparent'}
})