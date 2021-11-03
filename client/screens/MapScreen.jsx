import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View, StyleSheet } from 'react-native'
import { fetchStations } from '../Api/BackendAPI'
import { Container } from '../components/Container'
import { Map } from '../components/Map'
import { BottomDweller } from '../components/BottomDweller'
import { StationList } from '../components/StationList'

/**
 * Screen with a map widget
 * @param {object} props
 * @returns
 */
export const MapScreen = (props) => {
    const [stations, setStations] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        retrieveStationsFromAPI()
    }, [])

    const retrieveStationsFromAPI = async () => {
        setLoading(true)
        console.log('Stations fetching ...')
        const data = await fetchStations()
        setLoading(false)
        setStations(data)
    }

    const dimensions = Dimensions.get('window')
    const handleDwellerChanged = (index) => {}

    const handleInfoPress = (stationId) =>
        props.navigation.navigate('Station', { stationId })

    return (
        <Container>
            <Map
                markers={stations}
                dimensions={dimensions}
                isLoading={isLoading}
            />
            <BottomDweller callback={handleDwellerChanged}>
                <StationList
                    stations={stations}
                    isLoading={isLoading}
                    onInfoPress={handleInfoPress}
                />
            </BottomDweller>
        </Container>
    )
}

MapScreen.propTypes = {
    navigation: PropTypes.object,
}
