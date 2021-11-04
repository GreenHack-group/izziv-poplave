import React, { memo } from 'react'
import { Marker } from 'react-native-maps'
import { StationProps } from '../../shared/types'
import { MaterialIcons } from '@expo/vector-icons'
import theme from '../../shared/theme'

export const PozivkoMarker = memo(({ marker }) => {
    return (
        <Marker
            key={marker.stationId}
            title={marker.measuringPoint}
            tracksViewChanges={false}
            coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
            }}
        >
            <MaterialIcons
                name="water-damage"
                size={24}
                color={theme.COLORS.primary}
            />
        </Marker>
    )
})

PozivkoMarker.propTypes = StationProps
