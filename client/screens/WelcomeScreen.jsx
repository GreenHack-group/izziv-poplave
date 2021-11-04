import React from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native'
import { Container } from '../components/Container'

/**
 * Multiple part welcome screen to get permissions and introduce
 * user to the app (Notifications, locations, area, etc..)
 * @param {object} props
 * @returns
 */
export const WelcomeScreen = (props) => {
    const handleGoToPage = (page, options = {}) =>
        props.navigation.navigate(page, options)

    return (
        <Container>
            <Text>
                Will be a nice multiple steep welcome screen but for now just
                redirects
            </Text>
            <Button onPress={() => handleGoToPage('Map')} title={'Go to map'} />
            <Button
                onPress={() => handleGoToPage('Settings')}
                title={'Go to settings'}
            />
            <Button
                onPress={() =>
                    handleGoToPage('Station', { stationId: Math.random() })
                }
                title={'Redirect to station screen'}
            />
        </Container>
    )
}

WelcomeScreen.propTypes = {
    navigation: PropTypes.object,
}
