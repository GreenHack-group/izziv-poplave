import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import { fetchStations } from '../Api/BackendAPI'
import { Container } from '../components/Container'
import { Map } from '../components/Map'
import { BottomDweller } from '../components/BottomDweller'
import { ListItem } from '../components/StationList/ListItem'

/**
 * Screen with a map widget
 * @param {object} props
 * @returns
 */
export const MapScreen = (props) => {
    const [stations, setStations] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null)
    const mapRef = useRef(null)
    const dwellerRef = useRef(null)

    useEffect(() => {
        retrieveStationsFromAPI()
        if (dwellerRef.current) dwellerRef.current.close()
    }, [])

    const retrieveStationsFromAPI = async () => {
        setLoading(true)
        console.log('Stations fetching ...')
        const data = await fetchStations()
        setLoading(false)
        setStations(data)
    }

    const dimensions = Dimensions.get('window')

    const handleInfoPress = (stationId) => {
        props.navigation.navigate('Station', { stationId })
        console.log('clicked on station info')
    }

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
    }

    const handleOnMarkerPress = (station) => {
        console.log(station)
        setSelectedStation(station)
        animateToStation(station)
        if (dwellerRef.current) dwellerRef.current.expand()
        console.log('pritisnjen station na mapi')
    }

    return (
        <Container>
            <Map
                mapRef={mapRef}
                markers={stations}
                dimensions={dimensions}
                isLoading={isLoading}
                onMarkerPressed={handleOnMarkerPress}
            />
            {selectedStation !== null && (
                <BottomDweller dwellerRef={dwellerRef}>
                    <ListItem
                        station={selectedStation}
                        onInfoPress={handleInfoPress}
                        onPress={animateToStation}
                    />
                </BottomDweller>
            )}
        </Container>
    )
}

MapScreen.propTypes = {
    navigation: PropTypes.object,
}
