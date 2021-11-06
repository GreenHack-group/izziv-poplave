import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import theme from '../shared/theme'

export const DangerLevelDot = (props) => {
    let dangerColor = theme.COLORS.dangerLevels[props.dangerLevel]

    return <View style={{ ...styles.dot, backgroundColor: dangerColor }} />
}

DangerLevelDot.propTypes = {
    dangerLevel: PropTypes.number,
}

const styles = StyleSheet.create({
    dot: {
        width: 6,
        height: 6,
        borderRadius: 500,
        marginLeft: theme.LAYOUT.paddingSmall * 0.5,
    },
})
