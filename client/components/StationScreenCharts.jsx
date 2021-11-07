import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native'
import theme from '../shared/theme'

export const StationScreenCharts = () => {
    return (
        <View style={styles.container}>
            <VictoryChart
                width={Dimensions.get('screen').width - 40}
                theme={VictoryTheme.material}
            >
                <VictoryLine
                    style={{
                        data: { stroke: theme.COLORS.primary },
                        parent: { border: '1px solid #ccc' },
                    }}
                    data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 },
                    ]}
                />
            </VictoryChart>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.COLORS.white,
        padding: theme.LAYOUT.paddingLarge,
    },
})
