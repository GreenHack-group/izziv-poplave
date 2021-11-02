import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Text, View, StyleSheet } from 'react-native'
import { Container } from '../components/Container'
import { Map } from '../components/Map'
import { BottomDweller } from '../components/BottomDweller'
import theme from '../shared/theme'

/**
 * Screen with a map widget
 * @param {object} props
 * @returns
 */
export const MapScreen = (props) => {
    const dimensions = Dimensions.get('window')
    // Ha
    const handleDwellerChanged = (index) => {
        console.log('handleSheetChanges', index)
    }

    return (
        <Container>
            <Map dimensions={dimensions} />
            <BottomDweller callback={handleDwellerChanged}>
                <View style={styles.dwellerContainer}>
                    {/* TODO: Create card of stations to quickly navigate */}
                    <Text>Station 1 🎉</Text>
                    <Text>Station 2 🎉</Text>
                    <Text>Station 3 🎉</Text>
                    <Text>Station 4 🎉</Text>
                </View>
            </BottomDweller>
        </Container>
    )
}

const styles = StyleSheet.create({
    dwellerContainer: {
        padding: theme.LAYOUT.paddingMedium,
    },
})

MapScreen.propTypes = {
    navigation: PropTypes.object,
}
