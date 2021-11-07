import moment from 'moment'
import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import {
    VictoryLine,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from 'victory-native'
import { ButtonGroup } from 'react-native-elements'
import theme from '../shared/theme'

const MEASUREMENT_DATE = 'dateOfMeasurement'
const WATER_FLOW = 'waterFlow'
const WATER_LEVEL = 'waterLevel'
const WATER_TEMP = 'waterTemperature'

const parseData = (key, data) => {
    // console.log(key, data)
    return data.map((datum) => {
        const x = moment(datum[MEASUREMENT_DATE]).format('dddd H.mm')
        const y = datum[key]
        return { x, y }
    })
}

export const StationScreenCharts = ({ data }) => {
    const buttons = ['Vodostaj', 'Pretok', 'Temperatura']
    const charts = [
        parseData(WATER_LEVEL, data),
        parseData(WATER_FLOW, data),
        parseData(WATER_TEMP, data),
    ]
    const [selectedButton, setSelectedButton] = useState(0)
    const [selectedChart, setSelectedChart] = useState(charts[0])

    const updateSelectedChart = (idx) => {
        setSelectedButton(idx)
        setSelectedChart(charts[idx])
    }

    return (
        <View style={styles.container}>
            <ButtonGroup
                selectedButtonStyle={{ backgroundColor: theme.COLORS.primary }}
                onPress={updateSelectedChart}
                selectedIndex={selectedButton}
                buttons={buttons}
                containerStyle={{ height: 50 }}
            />
            <VictoryChart
                width={Dimensions.get('screen').width - 40}
                theme={VictoryTheme.material}
                fixLabelOverlap={true}
            >
                <VictoryLine
                    interpolation="natural"
                    animate={{
                        onLoad: { duration: 2000 },
                    }}
                    style={{
                        data: { stroke: theme.COLORS.primary },
                        parent: { border: '1px solid #ccc' },
                    }}
                    data={selectedChart}
                />
                <VictoryAxis fixLabelOverlap dependentAxis />
                <VictoryAxis fixLabelOverlap />
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
