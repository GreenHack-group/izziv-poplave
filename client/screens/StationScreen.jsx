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
import { StationPropertiesWidgetGraf } from '../components/StationProperties/StationPropertiesWidgetGraf'
import VodostajIcon from '../components/Icons/VodostajIcon'
import {RiverIcon} from "../components/Icons/RiverIcon";
import {WavesIcon} from "../components/Icons/WavesIcon";
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

    function getParsedDate(date){ // TODO
      date = String(date).split("T");
      var days = String(date[0]).split('-');
      var hours = String(date[1]).split(':');
      return parseInt(days[2]) + "." + parseInt(days[1])-1 + "." + parseInt(days[0]) + " | " + parseInt(hours[0]) + ":" + parseInt(hours[1])
      //return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
    }
    var date = new Date(...getParsedDate('2021-11-06T23:00:00'));
    console.log("datum: " + date)


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

            <View style={{flexDirection: "column"}}>
                <View style={{flexDirection: "row", justifyContent: 'space-between',}}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.text}>{stationData.river}</Text>
                        <RiverIcon/>
                    </View>

                    <Text style={styles.text2}>{getParsedDate(stationData.dateAndTime)}</Text>
                </View>
                <Text style={styles.text1}>{stationData.waterTemperature} °C</Text>
            </View>

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
                        <View
                            style={{
                            flexDirection: 'row',
                        }}>
                            <VodostajIcon />
                            <View
                                style={{
                                    flexDirection: 'column',
                                }}>
                                <Text>  {stationData.waterLevel}</Text>
                                <Text
                                    style={{color: theme.COLORS.softBlue}}
                                >  vodostaj v m</Text>
                            </View>
                        </View>
                        <Separator />
                        <View
                            style={{
                            flexDirection: 'row',
                        }}>
                            <WavesIcon/>
                            <View>
                                <Text>  {stationData.waterFlow}</Text>

                                <View style={{flexDirection: "row"}}>
                                    <Text style={{color: theme.COLORS.softBlue}}>pretok v </Text>
                                    <Text style={{ color: theme.COLORS.softBlue, fontSize: 15 }}>m</Text>
                                    <Text style={{ color: theme.COLORS.softBlue, fontSize: 10 }}>3</Text>
                                    <Text style={{ color: theme.COLORS.softBlue }}>/s</Text>
                                </View>
                            </View>
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
                    <Text style={{ justifyContent: 'flex-end' }}>
                        GRAFI TO BE
                    </Text>
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
        textAlign: "right",
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
