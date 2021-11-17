import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    StatusBar,
} from 'react-native'
import theme from '../shared/theme'
import { NavigationDots } from '../components/NavigationDots'
import PozivkoIcon from '../components/Icons/PozivkoIcon'
import { DefaultButton } from '../components/DefaultButton'
import { SmallText, HeaderText } from '../components/PozivkoText'
import { WelcomScreenAnimation } from '../components/Animations/NotifcationsAnimation'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Location from 'expo-location'
import { addDeviceNotificationSubscription } from '../Api/BackendAPI'

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
    const [pushToken, setPushToken] = useState(null)
    const [location, setLocation] = useState(null)

    const renderSubScreen = () => {
        const navigateNext = () => setSubScreen(subScreen + 1)
        switch (subScreen) {
            case SUB_SCREEN.NOTIFICATIONS:
                return (
                    <NotificationPermissionScreen
                        onClickNext={navigateNext}
                        setToken={(token) => setPushToken(token)}
                    />
                )
            case SUB_SCREEN.LOCATION:
                return (
                    <LocationPermissionsScreen
                        onClickNext={navigateNext}
                        setLocation={(location) => setLocation(location)}
                    />
                )
            case SUB_SCREEN.COMPLETE:
                const finishSetup = async () => {
                    if (null !== location && null !== pushToken) {
                        const { latitude, longitude } = location.coords
                        const payload = {
                            token: pushToken,
                            location: {
                                latitude,
                                longitude,
                            },
                        }
                        await addDeviceNotificationSubscription(payload)
                    }
                    props.navigation.navigate('Home')
                }
                return <YouAreAllSetupScreen onClickNext={finishSetup} />
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar animated backgroundColor={theme.COLORS.primary} />
            <View style={styles.welcomeWrapper}>
                <PozivkoIcon />
                <View>{renderSubScreen()}</View>
                <NavigationDots active={subScreen} />
            </View>
        </SafeAreaView>
    )
}

const NotificationPermissionScreen = (props) => {
    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data
            props.setToken(token)
            props.onClickNext()
        } else {
            alert('Must use physical device for Push Notifications')
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            })
        }
    }

    return (
        <View style={{ alignItems: 'center', width: '100%', flex: 1 }}>
            <WelcomScreenAnimation
                style={{
                    height: Dimensions.get('window').height * 0.4,
                    width: '100%',
                }}
                animation={require('../assets/animations/dovoljenje_notification.json')}
            />
            <View
                style={{
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
                <DefaultButton
                    title={'Dovoli'}
                    onPress={registerForPushNotificationsAsync}
                />
                <View style={{ marginTop: theme.LAYOUT.paddingLarge }} />
                <Pressable>
                    <Text style={styles.denyAccess}>Zavrni dostop</Text>
                </Pressable>
            </View>
        </View>
    )
}

const LocationPermissionsScreen = (props) => {
    const shareCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied')
            return
        }

        let location = await Location.getCurrentPositionAsync({})
        props.setLocation(location)
        props.onClickNext()
    }

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
                <DefaultButton
                    title={'Dovoli'}
                    onPress={shareCurrentLocation}
                />
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
                    width: '100%',
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
        flex: 1,
        backgroundColor: theme.COLORS.background,
        paddingHorizontal: theme.LAYOUT.paddingLarge * 2,
        paddingVertical: theme.LAYOUT.paddingLarge * 2,
        alignItems: 'center',
        justifyContent: 'center',
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
