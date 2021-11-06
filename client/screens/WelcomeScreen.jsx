import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Pressable, View, Text, StyleSheet, Dimensions } from 'react-native'
import { Container } from '../components/Container'
import theme from '../shared/theme'
import { NavigationDots } from '../components/NavigationDots'
import { NotificationLargeIcon } from '../components/Icons/NotificationLargeIcon'
import { SafeAreaView } from 'react-native-safe-area-context'
import PozivkoIcon from '../components/Icons/PozivkoIcon'
import { DefaultButton } from '../components/DefaultButton'
import { SmallText, HeaderText } from '../components/PozivkoText'
import { LocationLargeIcon } from '../components/Icons/LocationLargeIcon'

const SUB_SCREEN = {
    NOTIFICATIONS: 1,
    LOCATION: 2,
    COMPLETE: 3,
}

/**
 * Multiple part welcome screen to get permissions and introduce
 * user to the app (Notifications, locations, area, etc..)
 * @param {object} props
 * @returns
 */
export const WelcomeScreen = (props) => {
    const [subScreen, setSubScreen] = useState(SUB_SCREEN.NOTIFICATIONS)

    const renderSubScreen = () => {
        const navigateNext = () => setSubScreen(subScreen + 1)
        switch (subScreen) {
            case SUB_SCREEN.NOTIFICATIONS:
                return (
                    <NotificationPermissionScreen onClickNext={navigateNext} />
                )
            case SUB_SCREEN.LOCATION:
                return <LocationPermissionsScreen onClickNext={navigateNext} />
            case SUB_SCREEN.COMPLETE:
                const finishSetup = () => props.navigation.navigate('Map')
                return <YouAreAllSetupScreen onClickNext={finishSetup} />
        }
    }

    return (
        <SafeAreaView style={styles.welcomeWrapper}>
            <Container>
                <View style={styles.layoutContainer}>
                    <PozivkoIcon />
                    <View>{renderSubScreen()}</View>
                    <NavigationDots active={subScreen} />
                </View>
            </Container>
        </SafeAreaView>
    )
}

const NotificationPermissionScreen = (props) => {
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <NotificationLargeIcon />
            <View style={{ marginTop: theme.LAYOUT.paddingLarge }}>
                <HeaderText textAlign="center">Dostop do obvestil</HeaderText>
                <SmallText textAlign="center" color={theme.COLORS.softBlue}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </SmallText>
            </View>
            <View style={{ marginTop: theme.LAYOUT.paddingLarge * 6 }} />
            <DefaultButton title={'Dovoli'} onPress={props.onClickNext} />
            <View style={{ marginTop: theme.LAYOUT.paddingLarge }} />
            <Pressable>
                <Text style={styles.denyAccess}>Zavrni dostop</Text>
            </Pressable>
        </View>
    )
}

const LocationPermissionsScreen = (props) => {
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <LocationLargeIcon />
            <View style={{ marginTop: theme.LAYOUT.paddingLarge * 2 }}>
                <HeaderText textAlign="center">Dostop do lokacije</HeaderText>
                <SmallText textAlign="center" color={theme.COLORS.softBlue}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </SmallText>
            </View>
            <View style={{ marginTop: theme.LAYOUT.paddingLarge * 6 }} />
            <DefaultButton title={'Dovoli'} onPress={props.onClickNext} />
            <View style={{ marginTop: theme.LAYOUT.paddingLarge }} />
            <Pressable>
                <Text style={styles.denyAccess}>Zavrni dostop</Text>
            </Pressable>
        </View>
    )
}

const YouAreAllSetupScreen = (props) => {
    return (
        <View>
            <Pressable onPress={props.onClickNext}>
                <Text onPress={props.onClickNext}>TODO: animation</Text>
                <DefaultButton title={'To map'} onPress={props.onClickNext} />
            </Pressable>
        </View>
    )
}

const subScreenProps = {
    onClickNext: PropTypes.func,
    onClickCancel: PropTypes.func,
}

const styles = StyleSheet.create({
    welcomeWrapper: {
        backgroundColor: theme.COLORS.white,
        paddingHorizontal: theme.LAYOUT.paddingLarge * 2,
        flex: 1,
        // width: Dimensions.get('screen').width,
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    layoutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.LAYOUT.paddingLarge * 2,
    },
    denyAccess: {
        color: theme.COLORS.softBlue,
        textDecorationLine: 'underline',
    },
})

NotificationPermissionScreen.propTypes = subScreenProps
LocationPermissionsScreen.propTypes = subScreenProps
YouAreAllSetupScreen.propTypes = subScreenProps

WelcomeScreen.propTypes = {
    navigation: PropTypes.object,
}
