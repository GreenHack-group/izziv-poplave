import React, { createRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import { fetchStations } from '../Api/BackendAPI'
import { Container } from '../components/Container'
import { Map } from '../components/Map'
import { BottomDweller } from '../components/BottomDweller'
import { StationList } from '../components/StationList'

const DWELLER_STATE = {
    CLOSED: 0,
    EXTENDED: 1,
}

/**
 * Screen with a map widget
 * @param {object} props
 * @returns
 */
export const MapScreen = (props) => {
    const [stations, setStations] = useState([])
    const [isLoading, setLoading] = useState(false)
    const mapRef = useRef(null)
    const dwellerRef = useRef(null)

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

    const handleInfoPress = (stationId) =>
        props.navigation.navigate('Station', { stationId })

    const animateToStation = (station) => {
        const { latitude: lat, longitude: lng } = station
        if (mapRef.current) {
            mapRef.current.animateCamera({
                center: {
                    latitude: lat,
                    longitude: lng,
                },
                zoom: 15,
            })
        }
        dwellerRef.current.snapToIndex(DWELLER_STATE.CLOSED)
    }

    return (
        <Container>
            <Map
                mapRef={mapRef}
                markers={stations}
                dimensions={dimensions}
                isLoading={isLoading}
            />
            <BottomDweller dwellerRef={dwellerRef}>
                <StationList
                    onPress={animateToStation}
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
