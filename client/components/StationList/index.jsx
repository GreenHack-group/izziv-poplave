import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { StationListProps } from '../../shared/types'
import { ListItem } from './ListItem'

/**
 * @deprecated DO NOT USE THIS FOR STATION LIST
 */
export const StationList = (props) => {
    if (props.isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    const renderStationItem = useCallback(
        (station) => (
            <ListItem
                key={station.stationId}
                station={station}
                onPress={props.onPress}
                onInfoPress={props.onInfoPress}
            />
        ),
        []
    )
    return <>{props.stations.map(renderStationItem)}</>
}

StationList.propTypes = StationListProps
