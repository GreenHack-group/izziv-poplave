import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ScrollView } from 'react-native'
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
    return <ScrollView style={styles.container}>{props.children}</ScrollView>
}

const styles = StyleSheet.create({
    container: {
        //paddingVertical: theme.LAYOUT.paddingLarge,
        //paddingBottom: theme.LAYOUT.paddingLarge,
        //paddingHorizontal: theme.LAYOUT.paddingLarge,
        backgroundColor: theme.COLORS.background,
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
