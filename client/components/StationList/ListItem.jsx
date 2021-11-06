import React from 'react'
import PropTypes from 'prop-types'
import { Pressable, StyleSheet, Text, Dimensions, View } from 'react-native'
import { StationProps } from '../../shared/types'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import theme from '../../shared/theme'
import { BoldText } from '../PozivkoText'

export const ListItem = (props) => (
    <Pressable
        key={props.title}
        style={styles.itemWrapper}
        onPress={() => props.onPress(props.station)}
    >
        <View style={styles.leftWrapper}>
            <MaterialIcons
                name="water-damage"
                size={48}
                color={theme.COLORS.primary}
            />
            <BoldText marginLeft={theme.LAYOUT.paddingSmall}>
                {props.station.measuringPoint}
            </BoldText>
        </View>
        <View style={styles.rightWrapper}>
            <AntDesign
                onPress={() => props.onInfoPress(props.station.stationId)}
                name="infocirlce"
                size={36}
                color={theme.COLORS.primary}
            />
        </View>
    </Pressable>
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
})

ListItem.propTypes = {
    station: PropTypes.shape(StationProps),
    onPress: PropTypes.func,
    onInfoPress: PropTypes.func,
}
