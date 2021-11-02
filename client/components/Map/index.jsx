import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

/**
 * Map component
 * @param {object} props
 * @returns
 */
export const Map = (props) => {
    return (
        <View>
            <Text>Map {JSON.stringify(props.dimensions)}</Text>
        </View>
    )
}

Map.propTypes = {
    dimensions: PropTypes.object,
}
