import React, { useCallback, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import BottomSheet from '@gorhom/bottom-sheet'

const SNAP_POINTS = {
    CLOSED: 0,
    EXTENDED: 1,
}

export const BottomDweller = (props) => {
    // config for dweller
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['25%', '50%'], [])
    const handleSheetChanges = useCallback(props.callback, [])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={SNAP_POINTS.CLOSED}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            {props.children}
        </BottomSheet>
    )
}

BottomDweller.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    callback: PropTypes.func,
}
