import React, { useState } from 'react'

import { StyleSheet, View } from 'react-native'

/**
 * @deprecated REPLACED BY ANIMATIONS
 * @param {} param0
 * @returns
 */
export const PercentageBar = ({
    navigation,
    percentage,
    height,
    backgroundColor,
    completedColor,
}) => {
    const [getPercentage, setPercentage] = useState(percentage)
    const [getheight, setHeight] = useState(height)
    const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor)
    const [getCompletedColor, setCompletedColor] = useState(completedColor)
    return (
        <View>
            <View style={{ justifyContent: 'center' }}>
                <View
                    style={{
                        width: '100%',
                        height: getheight,
                        borderRadius: 5,
                        borderColor: getBackgroundColor,
                        borderWidth: 1,
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                        borderRadius: 5,
                        backgroundColor: getCompletedColor,
                        position: 'absolute',
                        bottom: 20,
                    }}
                />
                <View
                    style={{
                        width: getPercentage ? getPercentage : 0,
                        height: getheight,
                    }}
                ></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
