# Pozivko (F1)

<p align="center">
  <img src="https://github.com/GreenHack-group/izziv-poplave/blob/master/client/assets/pozivko-ico.png" />
</p>

Pozivko is a mobile application for iOS and Android which offers informational and up to the point visualisations of Hydrological station measurements in Slovenia.
The functionlities of Pozivko do not stop with only pretty display of data. Main feature of Pozivko is near real-time notification system that is based on your location and risk matrix predictions which are powered by open data. 

**With Pozivko the next flood won't catch you off guard**.

## Techonology used

- Mobile application: React Native, Expo
- Backend server application and API: .NET API
- Push notification scheduler: NodeJS cron jobs
- Push notification service: Expo push notification sdk
- Database: MySql

## Open data sources
- https://www.arso.gov.si/vode/podatki/hidro_podatki_xml.html
- https://api.eemis.net/

## How to setup client DEV environment

### Prequisite

- `node.js`
- `npm` or `yarn`
- expo-cli (`npm install --global expo-cli`)
- Expo GO (mobile application) or Mobile emulator setup

### Steps

1. Install dependecies inside `client` subfolder with either `npm i` or `yarn`
2. Start the dev server `yarn start` or `npm start`
3. Scan the QR code on your mobile with `Expo GO` app or if you prefer run it in
   emulator ([iOS](https://docs.expo.dev/workflow/ios-simulator/) or
   [Android](https://docs.expo.dev/workflow/android-studio-emulator/))
