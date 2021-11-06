import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export const StationProfileImage = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.stationPic}
                source={require('../../assets/img.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    stationPic: {
        width: '100%',
        height: 250,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
})
