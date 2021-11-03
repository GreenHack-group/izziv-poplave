import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { StationProps } from './types'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import theme from '../../shared/theme'

export const ListWidget = (props) => (
    <View key={props.title} style={styles.itemWrapper} onPress={props.onPress}>
        <View style={styles.leftWrapper}>
            <MaterialIcons
                name="water-damage"
                size={48}
                color={theme.COLORS.primary}
            />
            <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.rightWrapper}>
            <AntDesign
                onPress={props.onInfoPress}
                name="infocirlce"
                size={36}
                color={theme.COLORS.primary}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.LAYOUT.paddingLarge,
        marginBottom: theme.LAYOUT.paddingSmall,
        borderBottomColor: theme.COLORS.softBlue,
        borderBottomWidth: 1,
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: Dimensions.get('screen').width / 1.5,
    },
    rightWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: theme.FONTS.BOLD,
        marginLeft: theme.LAYOUT.paddingSmall,
        fontSize: theme.FONTS.SIZE_BASE,
    },
})

ListWidget.propTypes = StationProps
