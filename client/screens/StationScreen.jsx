import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Container } from '../components/Container'

/**
 * Screen to display station info and more
 * @param {object} props
 * @returns
 */
export const StationScreen = (props) => {
    // Will be used to fetch specific station info
    const { stationId } = props.route.params
    return (
        <Container>
            <Text>Station screen for station {stationId}</Text>
        </Container>
    )
}

StationScreen.propTypes = {
    navigation: PropTypes.object,
    params: PropTypes.object,
}
