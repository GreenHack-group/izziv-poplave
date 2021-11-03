import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { StationListProps } from '../../shared/types'
import { ListWidget } from './ListWidget'

export const StationList = (props) => {
    if (props.isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    const renderStationItem = useCallback(
        (station) => <ListWidget key={station.stationId} {...station} />,
        []
    )
    return <>{props.stations.map(renderStationItem)}</>
}

StationList.propTypes = StationListProps
