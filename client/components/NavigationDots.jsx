import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import theme from '../shared/theme'

export const NavigationDots = ({ active }) => {
    return (
        <View style={styles.container}>
            <View style={active !== 1 ? styles.dot : styles.dot_active}></View>
            <View style={active !== 2 ? styles.dot : styles.dot_active}></View>
            <View style={active !== 3 ? styles.dot : styles.dot_active}></View>
        </View>
    )
}

NavigationDots.propTypes = {
    active: PropTypes.number,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        height: 7,
        width: 7,
        borderRadius: 100,
        marginRight: theme.LAYOUT.paddingMedium,
        backgroundColor: theme.COLORS.softBlue,
    },
    dot_active: {
        height: 7,
        width: 7,
        borderRadius: 100,
        marginRight: theme.LAYOUT.paddingMedium,
        backgroundColor: theme.COLORS.darkBlue,
    },
})
