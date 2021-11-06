import React from 'react'
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'

export const WelcomScreenAnimation = (props) => {
    return (
        <LottieView
            style={props.style}
            source={props.animation}
            loop={false}
            autoPlay={true}
            onAnimationFinish={props.onAnimationFinished}
        />
    )
}

WelcomScreenAnimation.propTypes = {
    animation: PropTypes.object,
    onAnimationFinished: PropTypes.func,
    style: PropTypes.object,
}
