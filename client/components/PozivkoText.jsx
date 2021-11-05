import React from 'react'
import { Text, StyleSheet } from 'react-native'
import theme from '../shared/theme'

export const NormalText = ({ children, color = theme.COLORS.black }) => (
    <Text style={{ ...styles.normalText, color }}>{children}</Text>
)

export const BoldText = ({ children, color = theme.COLORS.black }) => (
    <Text style={{ ...styles.boldText, color }}>{children}</Text>
)

export const HeaderText = ({ children, color = theme.COLORS.black }) => (
    <Text style={{ ...styles.headerText, color }}>{children}</Text>
)

const styles = StyleSheet.create({
    normalText: {
        fontSize: theme.FONTS.SIZE_BASE,
        fontWeight: theme.FONTS.NORMAL,
        fontFamily: 'Roboto_500Medium',
    },
    boldText: {
        fontSize: theme.FONTS.SIZE_BASE,
        fontWeight: theme.FONTS.BOLD,
        fontFamily: 'Roboto_500Medium',
    },
    headerText: {
        fontSize: theme.FONTS.SIZE_LG,
        fontWeight: theme.FONTS.BOLD,
        fontFamily: 'Roboto_500Medium',
    },
})
