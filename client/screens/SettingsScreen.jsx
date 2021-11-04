import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '../shared/theme'

export const SettingsScreen = (props) => {
    return (
        <View>
            <Text style={styles.title}>Settings page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: theme.FONTS.SIZE_LG,
        fontWeight: theme.FONTS.BOLD,
        padding: theme.LAYOUT.paddingMedium,
    },
})
