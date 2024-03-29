import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { StationPropertiesContainer } from '../components/StationPropertiesContainer'
import { StationPropertiesWidgetSmall } from '../components/StationProperties/StationPropertiesWidgetSmall'
import theme from '../shared/theme'
import { StationPropertiesWidgetLarge } from '../components/StationProperties/StationPropertiesWidgetLarge'
import { StationProfileImage } from '../components/StationProperties/StationProfileImage'
import { fetchChartDataByStationId, fetchStationById } from '../Api/BackendAPI'
import OnStartAnimation from '../components/Animations/OnStartAnimation'
import { StationPropertiesWidgetGraf } from '../components/StationProperties/StationPropertiesWidgetGraf'
import { RiverIcon } from '../components/Icons/RiverIcon'
import moment from 'moment'
import { StationScreenAnimations } from '../components/StationScreenAnimations'
import { StationScreenCharts } from '../components/StationScreenCharts'
import { StationCurrentData } from '../components/StationCurrentData'

/**
 * Screen to display station info and more
 * @param {object} props
 * @returns
 */
export const StationScreen = (props) => {
    const { stationId } = props.route.params
    const [isLoading, setLoading] = useState(true)
    const [chartLoading, setChartLoading] = useState(true)
    const [chartData, setChartData] = useState(null)
    const [stationData, setStationData] = useState(null)

    useEffect(() => {
        retriveStationData()
        retriveChartData()
    }, [])

    const retriveStationData = async () => {
        setLoading(true)
        const data = await fetchStationById(stationId)
        setLoading(false)
        setStationData(data)
    }

    const retriveChartData = async () => {
        setChartLoading(true)
        const data = await fetchChartDataByStationId(stationId)
        setChartLoading(false)
        setChartData(data)
    }

    if (isLoading || stationData === null) {
        return <OnStartAnimation />
    }

    const getParsedDate = (date) => {
        const formatted = moment(date).format('D.MMMM YYYY | H.mm')
        return formatted
    }

    return (
        <StationPropertiesContainer>
            <View>
                <StationProfileImage />
                <View
                    style={{
                        position: 'absolute',
                        left: theme.LAYOUT.paddingMedium,
                        bottom: theme.LAYOUT.paddingMedium,
                    }}
                >
                    <Text style={styles.title}>
                        {stationData.measuringPoint}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>{stationData.river}</Text>
                        <RiverIcon />
                    </View>

                    <Text style={styles.text2}>
                        {getParsedDate(stationData.dateAndTime)}
                    </Text>
                </View>
                <Text style={styles.text1}>
                    {stationData.waterTemperature} °C
                </Text>
            </View>

            <View
                style={{
                    paddingHorizontal: theme.LAYOUT.paddingLarge,
                    flex: 1,
                }}
            >
                <StationPropertiesWidgetSmall>
                    <StationCurrentData data={stationData} />
                </StationPropertiesWidgetSmall>

                <StationPropertiesWidgetLarge>
                    <StationScreenAnimations data={stationData} />
                </StationPropertiesWidgetLarge>

                <StationPropertiesWidgetGraf>
                    {chartLoading || chartData === null ? (
                        <OnStartAnimation />
                    ) : (
                        <StationScreenCharts data={chartData} />
                    )}
                </StationPropertiesWidgetGraf>
            </View>
        </StationPropertiesContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: theme.FONTS.SIZE_LG,
        fontWeight: theme.FONTS.BOLD,
        color: theme.COLORS.white,
        padding: theme.LAYOUT.paddingMedium,
    },
    text: {
        fontSize: theme.FONTS.SIZE_MD,
        paddingHorizontal: theme.LAYOUT.paddingLarge,
    },
    text1: {
        color: theme.COLORS.softBlue,
        fontSize: theme.FONTS.SIZE_MD,
        paddingHorizontal: theme.LAYOUT.paddingLarge,
    },
    text2: {
        textAlign: 'right',
        color: theme.COLORS.softBlue,
        fontSize: theme.FONTS.SIZE_MD,
        paddingHorizontal: theme.LAYOUT.paddingLarge,
    },
    separator: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
})

StationScreen.propTypes = {
    navigation: PropTypes.object,
    params: PropTypes.object,
}
