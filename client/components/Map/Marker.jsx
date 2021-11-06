import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-native-maps'
import { StationProps } from '../../shared/types'
import { MaterialIcons } from '@expo/vector-icons'
import theme from '../../shared/theme'
import MarkerIcon from '../Icons/MarkerIcon'

export const PozivkoMarker = memo(({ marker, onMarkerPressed }) => {
    return (
        <Marker
            key={marker.stationId}
            title={marker.measuringPoint}
            tracksViewChanges={false}
            coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
            }}
            onPress={() => onMarkerPressed(marker)}
        >
            <MarkerIcon />
        </Marker>
    )
})

PozivkoMarker.propTypes = {
    marker: PropTypes.shape(StationProps),
    onMarkerPressed: PropTypes.func,
}
