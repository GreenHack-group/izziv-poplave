import React from 'react'
import { Text, StyleSheet } from 'react-native'
import theme from '../shared/theme'

export const SmallText = ({
    children,
    color = theme.COLORS.black,
    textAlign = 'left',
    ...rest
}) => (
    <Text style={{ ...styles.smallText, color, textAlign, ...rest }}>
        {children}
    </Text>
)

export const NormalText = ({
    children,
    color = theme.COLORS.black,
    textAlign = 'left',
    ...rest
}) => (
    <Text style={{ ...styles.normalText, color, textAlign, ...rest }}>
        {children}
    </Text>
)

export const BoldText = ({
    children,
    color = theme.COLORS.black,
    textAlign = 'left',
    ...rest
}) => (
    <Text style={{ ...styles.boldText, color, textAlign, ...rest }}>
        {children}
    </Text>
)

export const HeaderText = ({
    children,
    color = theme.COLORS.black,
    textAlign = 'left',
    ...rest
}) => (
    <Text style={{ ...styles.headerText, color, textAlign, ...rest }}>
        {children}
    </Text>
)

const styles = StyleSheet.create({
    smallText: {
        fontSize: theme.FONTS.SIZE_SM,
        fontWeight: theme.FONTS.NORMAL,
        fontFamily: theme.FONTS.ROBOTO,
    },
    normalText: {
        fontSize: theme.FONTS.SIZE_BASE,
        fontWeight: theme.FONTS.NORMAL,
        fontFamily: theme.FONTS.ROBOTO,
    },
    boldText: {
        fontSize: theme.FONTS.SIZE_BASE,
        fontWeight: theme.FONTS.BOLD,
        fontFamily: theme.FONTS.ROBOTO,
    },
    headerText: {
        fontSize: theme.FONTS.SIZE_XL,
        fontWeight: theme.FONTS.BOLD,
        fontFamily: theme.FONTS.ROBOTO,
    },
})
