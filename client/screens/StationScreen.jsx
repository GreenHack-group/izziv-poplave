import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { StationPropertiesContainer } from '../components/StationPropertiesContainer'
import { StationPropertiesWidgetSmall } from '../components/StationProperties/StationPropertiesWidgetSmall'
import theme from '../shared/theme'
import { StationPropertiesWidgetLarge } from '../components/StationProperties/StationPropertiesWidgetLarge'
import { StationProfileImage } from '../components/StationProperties/StationProfileImage'
import { fetchStationById } from '../Api/BackendAPI'
import OnStartAnimation from '../components/Animations/OnStartAnimation'
import {StationPropertiesWidgetGraf} from "../components/StationProperties/StationPropertiesWidgetGraf";
/**
 * Screen to display station info and more
 * @param {object} props
 * @returns
 */
// Will be used to fetch specific station info
// TODO podatki o postajo in background color

export const Separator = () => <View style={styles.separator} />

/**
 * Screen to display station info and more
 * @param {object} props
 * @returns
 */
export const StationScreen = (props) => {
    // Will be used to fetch specific station info
    const { stationId } = props.route.params
    const [isLoading, setLoading] = useState(true)
    const [stationData, setStationData] = useState(null)

    useEffect(() => {
        retriveStationData()
    }, []) // On init

    const retriveStationData = async () => {
        setLoading(true)
        const data = await fetchStationById(stationId)
        setLoading(false)
        setStationData(data)
    }

    if (isLoading || stationData === null) {
        return <OnStartAnimation />
    }

    return (
        <StationPropertiesContainer>
            <View>
                <StationProfileImage/>
                    <View style={{position: 'absolute', left: theme.LAYOUT.paddingMedium, bottom: theme.LAYOUT.paddingMedium}}>
                        <Text style={styles.title}>{stationData.measuringPoint}</Text>
                    </View>
            </View>

            <Text style={styles.text}>{stationData.river}</Text>
            <Text style={styles.text}>{stationData.dateAndTime}</Text>

            <View
                style={{
                    paddingHorizontal: theme.LAYOUT.paddingLarge,
                    flex: 1,
                }}
            >
                <StationPropertiesWidgetSmall>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <View>
                            <Text>{stationData.waterLevel} m</Text>
                        </View>
                        <Separator />
                        <View>
                            <Text>{stationData.waterTemperature} °C</Text>
                        </View>
                    </View>
                </StationPropertiesWidgetSmall>

                <StationPropertiesWidgetLarge>
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View>
                            <Text>ANIMACIJA VODOSTAJA</Text>
                        </View>
                        <View>
                            <Text>ANIMACIJA PRETOKA</Text>
                        </View>
                    </View>
                </StationPropertiesWidgetLarge>

                <StationPropertiesWidgetGraf>
                    <Text style={{justifyContent: 'right'}}>GRAFI TO BE</Text>
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
