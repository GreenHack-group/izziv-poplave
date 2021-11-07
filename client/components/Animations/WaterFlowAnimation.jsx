import React from 'react'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

export const WaterFlowAnimation1 = () => {
    const path = '../../assets/animations/graf_1.json'
    return (
        <LottieView
            style={styles.animation}
            source={require(path)}
            loop={false}
            autoPlay={true}
        />
    )
}

export const WaterFlowAnimation2 = () => {
    const path = '../../assets/animations/graf_2.json'
    return (
        <LottieView
            style={styles.animation}
            source={require(path)}
            loop={false}
            autoPlay={true}
        />
    )
}

export const WaterFlowAnimation3 = () => {
    const path = '../../assets/animations/graf_3.json'
    return (
        <LottieView
            style={styles.animation}
            source={require(path)}
            loop={false}
            autoPlay={true}
        />
    )
}

export const WaterFlowAnimation4 = () => {
    const path = '../../assets/animations/graf_4.json'
    return (
        <LottieView
            style={styles.animation}
            source={require(path)}
            loop={false}
            autoPlay={true}
        />
    )
}

export const WaterFlowAnimation5 = () => {
    const path = '../../assets/animations/graf_5.json'
    return (
        <LottieView
            style={styles.animation}
            source={require(path)}
            loop={false}
            autoPlay={true}
        />
    )
}

export const WaterFlowAnimation6 = () => {
    const path = '../../assets/animations/graf_6.json'
    return (
        <LottieView
            style={styles.animation}
            source={require(path)}
            loop={false}
            autoPlay={true}
        />
    )
}

const styles = StyleSheet.create({
    animation: {
        width: '100%',
    },
})
