import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import theme from './shared/theme'

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen'
import { MapScreen } from './screens/MapScreen'
import { StationScreen } from './screens/StationScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={HeaderOptions}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="Station" component={StationScreen} />
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
        fontWeight: 'bold',
    },
}
