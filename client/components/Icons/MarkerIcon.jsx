import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path, Circle } from 'react-native-svg'
import theme from '../../shared/theme'

const MarkerIcon = (props) => {
    let dangerColor = theme.COLORS.dangerLevels[props.dangerLevel]
    return (
        <Svg
            width="30"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M15 0C11.022 0 7.206 1.475 4.393 4.1 1.58 6.726 0 10.288 0 14c0 10.5 15 26 15 26s15-15.5 15-26c0-3.713-1.58-7.274-4.393-9.9C22.794 1.476 18.978 0 15 0z"
                fill={dangerColor}
            />
            <Circle cx="15" cy="15" r="11.25" fill="#fff" />
            <Path
                d="M13.25 21.25h7.875v-7.059h2.625L15 6.25l-8.75 7.941h2.625v7.059h4.375z"
                fill={dangerColor}
            />
            <Path
                d="M15 18c.53 0 1.04-.221 1.414-.615.375-.394.586-.928.586-1.485 0-1.575-2-3.9-2-3.9s-2 2.325-2 3.9c0 .557.21 1.091.586 1.485.375.394.884.615 1.414.615z"
                fill="#fff"
            />
        </Svg>
    )
}

MarkerIcon.propTypes = {
    dangerLevel: PropTypes.number,
}

export default MarkerIcon
