import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import theme from './shared/theme'
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto'

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen'
import { MapScreen } from './screens/MapScreen'
import { StationScreen } from './screens/StationScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { StationListScreen } from './screens/StationListScreen'
import OnStartAnimation from './components/Animations/OnStartAnimation'
import { StationsProvider } from './context/StationsContext'
import PozivkoWhite from './components/Icons/PozivkoWhite'
import NotificationsListener from './context/NotificationsListener'

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()

const HomeTabs = () => (
    <NotificationsListener>
        <StationsProvider>
            <Tab.Navigator screenOptions={TabsOptions}>
                <Tab.Screen
                    name="Stations"
                    component={StationListScreen}
                    options={{ title: 'Seznam postaj' }}
                />
                <Tab.Screen
                    name="Map"
                    component={MapScreen}
                    options={{ title: 'Zemljevid' }}
                />
            </Tab.Navigator>
        </StationsProvider>
    </NotificationsListener>
)

/**
 * Application entry point
 * mainly just used to handle navigation
 * and global logic that needs to be executed
 * on app start
 */
export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_500Medium,
    })

    const [startingAnimation, setStartingAnimation] = useState(true)

    if (startingAnimation || !fontsLoaded) {
        return (
            <OnStartAnimation
                onAnimationFinished={() => setStartingAnimation(false)}
            />
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={HeaderOptions}>
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={{ headerBackVisible: false, title: 'Pozivko' }}
                />
                <Stack.Screen name="Station" component={StationScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const HeaderOptions = {
    headerStyle: {
        backgroundColor: theme.COLORS.primary,
    },
    headerTintColor: theme.COLORS.white,
    headerTitleStyle: {
        fontWeight: theme.FONTS.BOLD,
        fontFamily: theme.FONTS.ROBOTO,
        fontSize: theme.FONTS.SIZE_XL,
    },
    headerRight: () => <PozivkoWhite />,
}

const TabsOptions = {
    tabBarStyle: {
        backgroundColor: theme.COLORS.primary,
        paddingBottom: theme.LAYOUT.paddingSmall,
    },
    tabBarActiveTintColor: theme.COLORS.white,
    tabBarInactiveTintColor: theme.COLORS.softBlue,
    tabBarIndicatorStyle: {
        backgroundColor: theme.COLORS.white,
        height: 5,
    },
}
