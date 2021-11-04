import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import theme from '../shared/theme'

const DWELLER_CLOSED = 0

export const BottomDweller = (props) => {
    const snapPoints = useMemo(() => ['25%', '75%'], [])

    return (
        <BottomSheet
            ref={props.dwellerRef}
            index={DWELLER_CLOSED}
            snapPoints={snapPoints}
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
    dwellerRef: PropTypes.object,
}
