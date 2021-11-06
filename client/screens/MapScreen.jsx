import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import { Container } from '../components/Container'
import { Map } from '../components/Map'
import { BottomDweller } from '../components/BottomDweller'
import { ListItem } from '../components/StationList/ListItem'
import { StationsContext } from '../context/StationsContext'

/**
 * Screen with a map widget
 * @param {object} props
 * @returns
 */
export const MapScreen = (props) => {
    const { stations, isLoading } = useContext(StationsContext)
    const [selectedStation, setSelectedStation] = useState(null)
    const mapRef = useRef(null)
    const dwellerRef = useRef(null)
    const dimensions = Dimensions.get('window')
    useEffect(() => {
        if (dwellerRef.current) dwellerRef.current.close()
    }, [])

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
    }

    const handleOnMarkerPress = (station) => {
        console.log(station)
        setSelectedStation(station)
        animateToStation(station)
        if (dwellerRef.current) dwellerRef.current.expand()
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
