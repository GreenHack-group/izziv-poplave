import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MapView, { Marker } from 'react-native-maps'
import { StationListProps } from '../../shared/types'

const THREE_QUARTERS_OF_SCREEN = 0.75

/* TODO: Style, center, cluster markers, zoom, etc...  */
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

    const renderMarker = useCallback(
        (marker) => (
            <Marker
                key={marker.stationId}
                title={marker.measuringPoint}
                coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                }}
            />
        ),
        []
    )

    return (
        <View style={styles.mapContainer}>
            <MapView
                {...mapOptions}
                style={{
                    width: props.dimensions.width,
                    height: props.dimensions.height * THREE_QUARTERS_OF_SCREEN,
                }}
            >
                {!props.isLoading &&
                    props.markers.length > 0 &&
                    props.markers.map(renderMarker)}
            </MapView>
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
    markers: PropTypes.shape(StationListProps),
    isLoading: PropTypes.bool,
}
