import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'
import { StationPropertiesContainer } from "../components/StationPropertiesContainer";
import {StationPropertiesWidgetSmall} from "../components/StationProperties/StationPropertiesWidgetSmall";
import theme from "../shared/theme";
import {StationPropertiesWidgetLarge} from "../components/StationProperties/StationPropertiesWidgetLarge";
import { StationProfileImage } from "../components/StationProperties/StationProfileImage";
/**
 * Screen to display station info and more
 * @param {object} props
 * @returns
 */
export const StationScreen = (props) => {
    // Will be used to fetch specific station info
    // TODO podatki o postajo in background color

    //             <Text style={styles.title}>Station properties screen</Text>
    //             <Text style={styles.text}>Properties for station with id: {stationId}</Text>
    /*
        <Text> Testing small widget left</Text>
        <Text> Testing small widget right</Text>

        <Text> Testing large widget 2</Text>

                    <Text> Testing small widget left 2</Text>
                    <Text> Testing small widget right 2</Text>
     */



    const { stationId } = props.route.params
    return (
        <StationPropertiesContainer>

            <StationProfileImage>

            </StationProfileImage>

            <View style={{ paddingHorizontal: theme.LAYOUT.paddingLarge, flex: 1 }}>

                <StationPropertiesWidgetSmall>

                </StationPropertiesWidgetSmall>

                <StationPropertiesWidgetLarge>
                </StationPropertiesWidgetLarge>

                <StationPropertiesWidgetSmall>

                </StationPropertiesWidgetSmall>

            </View>
        </StationPropertiesContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: theme.FONTS.SIZE_LG,
        fontWeight: theme.FONTS.BOLD,
        padding: theme.LAYOUT.paddingMedium,
    },
    text: {
        fontSize: theme.FONTS.SIZE_MD,
        padding: theme.LAYOUT.paddingSmall,
    }
})

StationScreen.propTypes = {
    navigation: PropTypes.object,
    params: PropTypes.object,
}
