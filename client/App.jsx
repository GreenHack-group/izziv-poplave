import React, { useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import theme from './shared/theme'
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto'

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen'
import { MapScreen } from './screens/MapScreen'
import { StationScreen } from './screens/StationScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import OnStartAnimation from './components/Animations/OnStartAnimation'

const Stack = createNativeStackNavigator()

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

    if (startingAnimation) {
        return (
            <OnStartAnimation
                onAnimationFinished={() => setStartingAnimation(false)}
            />
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={HeaderOptions}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
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
