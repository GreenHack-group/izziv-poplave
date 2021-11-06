import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import theme from '../shared/theme'
import { SmallText } from '../components/PozivkoText'
import { Feather } from '@expo/vector-icons'

const StationListItem = (props) => {
    return (
        <Pressable
            style={styles.container}
            onPress={() => props.onPress(props.station.stationId)}
        >
            <View>
                <Image
                    style={styles.image}
                    source={require('../assets/postaja.png')}
                />
                <Text style={styles.stationName}>
                    {props.station.measuringPoint}
                </Text>
                <Feather
                    style={styles.infoIcon}
                    name="alert-circle"
                    size={24}
                    color={theme.COLORS.white}
                />
            </View>

            <View style={styles.bottomContainer}>
                <SmallText
                    color={theme.COLORS.softBlue}
                    marginRight={theme.LAYOUT.paddingSmall}
                >
                    Stopnja nevarnosti poplav:
                </SmallText>
                <SmallText>Nizka</SmallText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: theme.COLORS.white,
        marginTop: theme.LAYOUT.paddingLarge,
    },
    image: {
        width: '100%',
        height: 130,
    },
    stationName: {
        position: 'absolute',
        bottom: theme.LAYOUT.paddingMedium,
        left: theme.LAYOUT.paddingLarge,
        zIndex: 10,
        color: theme.COLORS.white,
        fontSize: theme.FONTS.SIZE_XL,
    },
    infoIcon: {
        position: 'absolute',
        top: theme.LAYOUT.paddingMedium,
        right: theme.LAYOUT.paddingLarge,
        zIndex: 10,
    },

    bottomContainer: {
        padding: theme.LAYOUT.paddingMedium,
        flexDirection: 'row',
    },
    levelOfDanger: {},
})

export default StationListItem
