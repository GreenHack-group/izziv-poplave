import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import dangerLevels from '../../shared/dangerLevels'
import theme from '../../shared/theme'
import MarkerIcon from '../Icons/MarkerIcon'
import { NormalText, SmallText } from '../PozivkoText'

export const Legend = () => {
    const [legendOpen, setLegendOpen] = useState(false)
    const toggleLegend = () => setLegendOpen(!legendOpen)

    if (!legendOpen) {
        return (
            <Pressable style={styles.legendContainer} onPress={toggleLegend}>
                <View style={styles.legendEntry}>
                    <NormalText>Odpri legendo</NormalText>
                </View>
            </Pressable>
        )
    }

    return (
        <Pressable style={styles.legendContainer} onPress={toggleLegend}>
            <LegendEntry level={0} />
            <LegendEntry level={1} />
            <LegendEntry level={2} />
            <LegendEntry level={3} />
            <LegendEntry level={4} />
        </Pressable>
    )
}

const LegendEntry = ({ level }) => (
    <View style={styles.legendEntry}>
        <MarkerIcon dangerLevel={level} />
        <SmallText marginLeft={theme.LAYOUT.paddingSmall}>
            {dangerLevels[level]}
        </SmallText>
    </View>
)

const styles = StyleSheet.create({
    legendContainer: {
        position: 'absolute',
        top: theme.LAYOUT.paddingLarge,
        right: theme.LAYOUT.paddingSmall,
        padding: theme.LAYOUT.paddingLarge,
        zIndex: 10,
        backgroundColor: theme.COLORS.white,
        borderRadius: theme.LAYOUT.rounded,
    },
    legendEntry: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.LAYOUT.paddingSmall,
    },
})
