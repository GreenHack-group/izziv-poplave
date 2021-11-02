import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Text } from 'react-native'
import { Container } from '../components/Container'
import { Map } from '../components/Map'

/**
 * Screen with a map widget
 * @param {object} props
 * @returns
 */
export const MapScreen = (props) => {
    const dimensions = Dimensions.get('window')
    return (
        <Container>
            <Text>Map of Slovenia</Text>
            <Map dimensions={dimensions} />
        </Container>
    )
}

MapScreen.propTypes = {
    navigation: PropTypes.object,
}
