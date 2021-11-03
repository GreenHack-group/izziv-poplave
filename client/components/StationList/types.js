import PropTypes from 'prop-types'

// Backend DTO object
const StationDTO = {
    StationName: PropTypes.string,
    Longitude: PropTypes.number.isRequired,
    Latitude: PropTypes.number.isRequired,
}

export const StationProps = {
    ...StationDTO,
    onPress: PropTypes.func,
    onInfoPress: PropTypes.func,
}

export const StationListProps = {
    stations: PropTypes.arrayOf(StationProps),
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
    onInfoPress: PropTypes.func,
}
