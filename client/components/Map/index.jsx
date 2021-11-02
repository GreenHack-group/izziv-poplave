import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MapView from 'react-native-maps'

const THREE_QUARTERS_OF_SCREEN = 0.75

/**
 * Map component
 * @param {object} props
 * @returns
 */
export const Map = (props) => {
    // https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
    const mapOptions = {
        showsBuildings: false,
        showIndoors: false,
        mapType: 'mutedStandard',
    }

    /* TODO: Style, center, markers, zoom, etc...  */

    return (
        <View style={styles.mapContainer}>
            <MapView
                {...mapOptions}
                style={{
                    width: props.dimensions.width,
                    height: props.dimensions.height * THREE_QUARTERS_OF_SCREEN,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})

Map.propTypes = {
    dimensions: PropTypes.object,
}
