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
export const StationPropertiesWidgetLarge = (props) => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.LAYOUT.paddingLarge,
        backgroundColor: theme.COLORS.white,
        marginBottom: 5,
        marginVertical: 5,
        color: theme.COLORS.black,
        flex: 0.5,
        borderRadius: 20,
    },
})

StationPropertiesWidgetLarge.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
}
