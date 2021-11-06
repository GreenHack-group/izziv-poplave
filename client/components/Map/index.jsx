import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MapView from 'react-native-maps'
// import MapView from 'react-native-map-clustering'
import { StationProps } from '../../shared/types'
import { PozivkoMarker } from './Marker'
import mapStyle from '../../assets/mapStyles.json'

const INITIAL_REGION_SLOVENIA = {
    latitude: 46.420329292548146,
    longitude: 14.999288655817509,
    longitudeDelta: 3.195434957742693,
    latitudeDelta: 3.2873723681908373,
}

/* TODO: Style, center, cluster markers, zoom, etc...  */
/**
 * Map component
 * @param {object} props
 * @returns
 */
export const Map = (props) => {
    const mapOptions = {
        showsBuildings: false,
        showsIndoors: false,
        maxZoomLevel: 18,
        minZoomLevel: 7,
        showsCompass: false,
        showsScale: false,
        moveOnMarkerPress: false,
        showsMyLocationButton: false,
        rotateEnabled: false,
        toolbarEnabled: false,
        initialRegion: INITIAL_REGION_SLOVENIA,
        loadingEnabled: true,
    }

    const renderMarker = useCallback(
        (marker) => (
            <PozivkoMarker
                key={marker.stationId}
                marker={marker}
                onMarkerPressed={props.onMarkerPressed}
            />
        ),
        []
    )

    return (
        <View style={styles.mapContainer}>
            <MapView
                ref={props.mapRef}
                customMapStyle={mapStyle}
                style={{
                    width: props.dimensions.width,
                    height: props.dimensions.height,
                }}
                initialRegion={INITIAL_REGION_SLOVENIA}
                {...mapOptions}
            >
                {!props.isLoading && props.markers.map(renderMarker)}
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
    markers: PropTypes.arrayOf(PropTypes.shape(StationProps)),
    isLoading: PropTypes.bool,
    mapRef: PropTypes.object,
    onMarkerPressed: PropTypes.func,
}
