import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WavesIcon } from './Icons/WavesIcon'
import { WaterLevelIcon } from './Icons/WaterLevelIcon'
import theme from '../shared/theme'

export const StationCurrentData = ({ data }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <WaterLevelIcon />
                <View
                    style={{
                        paddingLeft: 5,
                    }}
                >
                    <Text style={styles.datum}> {data.waterLevel}</Text>
                    <Text style={{ color: theme.COLORS.softBlue }}>
                        vodostaj v m
                    </Text>
                </View>
            </View>
            <Separator />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <WavesIcon />
                <View>
                    <Text style={styles.datum}>{data.waterFlow}</Text>
                    <View style={styles.pretok}>
                        <Text style={{ color: theme.COLORS.softBlue }}>
                            pretok v <CubicMetrePerSecond />
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const CubicMetrePerSecond = () => (
    <>
        <Text
            style={{
                color: theme.COLORS.softBlue,
                fontSize: 15,
            }}
        >
            m
        </Text>
        <Text
            style={{
                color: theme.COLORS.softBlue,
                fontSize: 10,
            }}
        >
            3
        </Text>
        <Text style={{ color: theme.COLORS.softBlue }}>/s</Text>
    </>
)

const Separator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {},
    pretok: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    datum: {
        fontSize: theme.FONTS.SIZE_XL,
        fontWeight: theme.FONTS.BOLD,
    },
})
