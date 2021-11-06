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
    // Will be used to fetch specific station info
    // TODO podatki o postajo in background color

export const Separator = () => (
  <View style={styles.separator} />
);

/**
 * Screen to display station info and more
 * @param {object} props
 * @returns
 */
export const StationScreen = (props) => {
    // Will be used to fetch specific station info
    const { stationId } = props.route.params
    return (
        <StationPropertiesContainer>
            <StationProfileImage>
            </StationProfileImage>
                <View style={{ paddingHorizontal: theme.LAYOUT.paddingLarge, flex: 1 }}>

                    <StationPropertiesWidgetSmall>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View >
                                <Text>Leva</Text>
                            </View>
                                <Separator/>
                            <View >
                                <Text>Desna</Text>
                            </View>
                        </View>

                    </StationPropertiesWidgetSmall>

                    <StationPropertiesWidgetLarge>

                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View >
                                <Text>Leva</Text>
                            </View>
                            <View >
                                <Text>Leva</Text>
                            </View>
                        </View>

                    </StationPropertiesWidgetLarge>

                    <StationPropertiesWidgetSmall>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View >
                                <Text>Leva Spodaj</Text>
                            </View>
                                <Separator/>
                            <View >
                                <Text>Desna Spodaj</Text>
                            </View>
                        </View>
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
    },
    separator: {
        //marginVertical: 8,
        //borderBottomColor: theme.COLORS.black,
        //borderBottomWidth: 1,
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
  },
})

StationScreen.propTypes = {
    navigation: PropTypes.object,
    params: PropTypes.object,
}
