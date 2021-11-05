import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const OnStartAnimation = (props) => {
    return (
        <LottieView
            style={styles.animationContainer}
            source={require('../../assets/animations/pozivko_on_start.json')}
            loop={false}
            autoPlay={true}
            onAnimationFinish={props.onAnimationFinished}
        />
    )
}

const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
    },
})

OnStartAnimation.propTypes = {
    onAnimationFinished: PropTypes.func,
}

export default OnStartAnimation
