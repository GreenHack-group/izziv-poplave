import PropTypes from 'prop-types'

// Backend DTO object
const StationDTO = {
    measuringPoint: PropTypes.string,
    river: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
}

export const StationProps = {
    ...StationDTO,
}

export const StationListProps = {
    stations: PropTypes.arrayOf(PropTypes.shape(StationProps)),
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
    onInfoPress: PropTypes.func,
}
