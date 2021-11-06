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

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()

const HomeTabs = () => (
    <StationsProvider>
        <Tab.Navigator>
            <Tab.Screen name="Stations" component={StationListScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
    </StationsProvider>
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
                    options={{ headerBackVisible: false }}
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
        fontFamily: 'Roboto_500Medium',
    },
}
