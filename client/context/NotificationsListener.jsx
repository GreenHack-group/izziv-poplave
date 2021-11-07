import React, { useEffect, useState, useRef } from 'react'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

const NotificationsListener = (props) => {
    const [notification, setNotification] = useState(null)
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notif) =>
                _handleNotification(notif)
            )

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) =>
                _handleNotificationResponse(response)
            )
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )
            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])

    const _handleNotification = (notification) => {
        console.log(notification)
        setNotification(notification)
    }

    const _handleNotificationResponse = (response) => {
        console.log(response)
    }
    return <>{props.children}</>
}

export default NotificationsListener
