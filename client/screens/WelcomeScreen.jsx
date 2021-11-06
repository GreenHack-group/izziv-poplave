import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Pressable, View, Text, StyleSheet, Dimensions } from 'react-native'
import { Container } from '../components/Container'
import theme from '../shared/theme'
import { NavigationDots } from '../components/NavigationDots'
import { SafeAreaView } from 'react-native-safe-area-context'
import PozivkoIcon from '../components/Icons/PozivkoIcon'
import { DefaultButton } from '../components/DefaultButton'
import { SmallText, HeaderText } from '../components/PozivkoText'
import { WelcomScreenAnimation } from '../components/Animations/NotifcationsAnimation'

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
                const finishSetup = () => props.navigation.navigate('Home')
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
        <View style={{ alignItems: 'center', width: '100%', flex: 1 }}>
            <WelcomScreenAnimation
                style={{ height: Dimensions.get('window').height * 0.4 }}
                animation={require('../assets/animations/dovoljenje_notification.json')}
            />
            <View
                style={{
                    flex: 0.6,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <View style={{ marginTop: theme.LAYOUT.paddingLarge }}>
                    <HeaderText textAlign="center">
                        Dostop do obvestil
                    </HeaderText>
                    <SmallText textAlign="center" color={theme.COLORS.softBlue}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </SmallText>
                </View>
                <View style={{ marginTop: theme.LAYOUT.paddingLarge * 2 }} />
                <DefaultButton title={'Dovoli'} onPress={props.onClickNext} />
                <View style={{ marginTop: theme.LAYOUT.paddingLarge }} />
                <Pressable>
                    <Text style={styles.denyAccess}>Zavrni dostop</Text>
                </Pressable>
            </View>
        </View>
    )
}

const LocationPermissionsScreen = (props) => {
    return (
        <View style={{ alignItems: 'center', width: '100%', flex: 1 }}>
            <WelcomScreenAnimation
                style={{ height: Dimensions.get('window').height * 0.4 }}
                animation={require('../assets/animations/dovoljenje_location.json')}
            />
            <View
                style={{
                    flex: 0.6,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <View style={{ marginTop: theme.LAYOUT.paddingLarge }}>
                    <HeaderText textAlign="center">
                        Dostop do obvestil
                    </HeaderText>
                    <SmallText textAlign="center" color={theme.COLORS.softBlue}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </SmallText>
                </View>
                <View style={{ marginTop: theme.LAYOUT.paddingLarge * 2 }} />
                <DefaultButton title={'Dovoli'} onPress={props.onClickNext} />
                <View style={{ marginTop: theme.LAYOUT.paddingLarge }} />
                <Pressable>
                    <Text style={styles.denyAccess}>Zavrni dostop</Text>
                </Pressable>
            </View>
        </View>
    )
}

const YouAreAllSetupScreen = (props) => {
    return (
        <View style={{ alignItems: 'center', width: '100%', flex: 1 }}>
            <WelcomScreenAnimation
                style={{
                    height: Dimensions.get('window').height * 0.6,
                    marginLeft: 30,
                }}
                animation={require('../assets/animations/all_set.json')}
                onAnimationFinished={props.onClickNext}
            />

            <View>
                <HeaderText textAlign="center">Vse je pripravljeno!</HeaderText>
            </View>
        </View>
    )
}

const subScreenProps = {
    onClickNext: PropTypes.func,
    onClickCancel: PropTypes.func,
}

const styles = StyleSheet.create({
    welcomeWrapper: {
        backgroundColor: theme.COLORS.background,
        paddingHorizontal: theme.LAYOUT.paddingLarge * 2,
        flex: 1,
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    layoutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: theme.LAYOUT.paddingLarge * 2,
        paddingBottom: theme.LAYOUT.paddingLarge * 3,
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
