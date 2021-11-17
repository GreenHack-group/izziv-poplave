import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import theme from '../../shared/theme'

/**
 *
 * @param {object} props
 * @returns
 */
export const StationPropertiesWidgetGraf = (props) => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.white,
        marginVertical: 5,
        color: theme.COLORS.black,
        flex: 1,
    },
})

StationPropertiesWidgetGraf.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
}
