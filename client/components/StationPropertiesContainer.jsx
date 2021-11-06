import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import theme from '../shared/theme'

/**
 * A simple container that wraps screen
 * and gives some common padding to the sides
 * default bg and text color
 *
 * @param {object} props
 * @returns
 */
export const StationPropertiesContainer = (props) => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        //paddingVertical: theme.LAYOUT.paddingLarge,
        //paddingBottom: theme.LAYOUT.paddingLarge,
        //paddingHorizontal: theme.LAYOUT.paddingLarge,
        backgroundColor: theme.COLORS.softBlue,
        color: theme.COLORS.black,
        flex: 1,
    },
})

StationPropertiesContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
}
