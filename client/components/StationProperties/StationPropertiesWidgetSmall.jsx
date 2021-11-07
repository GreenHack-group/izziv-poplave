import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import theme from '../../shared/theme'

/**
 * A simple container that wraps screen
 * and gives some common padding to the sides
 * default bg and text color
 *
 * @param {object} props
 * @returns
 */
export const StationPropertiesWidgetSmall = (props) => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: theme.LAYOUT.paddingMedium,
        paddingHorizontal: theme.LAYOUT.paddingLarge,
        marginBottom: 5,
        marginVertical: 5,
        backgroundColor: theme.COLORS.white,
        color: theme.COLORS.black,
        flex: 0.5,
        borderRadius: 20,
    },
})

StationPropertiesWidgetSmall.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
}
