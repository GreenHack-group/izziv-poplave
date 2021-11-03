import React, { useCallback, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import theme from '../shared/theme'

const SNAP_POINTS = {
    CLOSED: 0,
    EXTENDED: 1,
}

export const BottomDweller = (props) => {
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['25%', '75%'], [])
    const handleSheetChanges = useCallback(props.callback, [])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={SNAP_POINTS.CLOSED}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <BottomSheetScrollView style={styles.dwellerContainer}>
                {props.children}
            </BottomSheetScrollView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    dwellerContainer: {
        padding: theme.LAYOUT.paddingMedium,
    },
})

BottomDweller.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    callback: PropTypes.func,
}
