import React from 'react'
import PropTypes from 'prop-types'
import { Pressable, StyleSheet, Text } from 'react-native'
import theme from '../shared/theme'

export const DefaultButton = ({ title, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

DefaultButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.COLORS.primary,
        borderRadius: theme.LAYOUT.rounded,
        paddingVertical: theme.LAYOUT.paddingLarge,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    text: {
        color: theme.COLORS.white,
        fontFamily: theme.FONTS.ROBOTO,
        fontSize: theme.FONTS.SIZE_BASE,
        lineHeight: 21,
    },
})
