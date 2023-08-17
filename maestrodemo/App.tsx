/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {Linking} from 'react-native';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import QRCode from './OtherPage';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {authenticate} from 'react-native-biometrics-scanner';
const Stack = createNativeStackNavigator();

async function biometrics() {
  return await authenticate({
    promptMessage: 'Touch the fingerprint sensor or look at your device',
  });
}

async function onLogin(setUser: any) {
  const deepLink = 'maestro://callback';
  let url;
  if (Platform.OS === 'ios') {
    url = `http://localhost:3000/login?redirect_uri=${deepLink}`;
  } else {
    url = `http://10.0.2.2:3000/login?redirect_uri=${deepLink}`;
  }
  try {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.openAuth(url, deepLink, {
        // iOS Properties
        ephemeralWebSession: false,
        // Android Properties
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      })
        .then(response => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        })
        .then(() => {
          setUser('Adam');
        });
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Linking.openURL(url);
  }
}

function Login(): JSX.Element {
  const {navigate} = useNavigation();
  useEffect(() => {
    InAppBrowser.mayLaunchUrl('http://localhost:3000', []);
  }, []);
  const [user, setUser] = useState('');
  useEffect(() => {
    if (user !== '') {
      navigate('QRScanner');
    }
  }, [user]);
  return (
    <SafeAreaView style={styles.login}>
      <Text style={styles.title}>You need to log in</Text>
      <Pressable
        onPress={() => {
          onLogin(setUser);
        }}
        style={styles.button}>
        <Text style={styles.btntext}>
          Click here to open a link to log in (boring)
        </Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          await biometrics();
          setUser('Adam' + new Date());
        }}
        style={styles.button}>
        <Text style={styles.btntext}>
          {' '}
          Biometric Authentication (Very cool, not boring)
        </Text>
      </Pressable>
      <Text>
        Fun fact! This app took less time to make, than it did to get Cocoapods
        working!
      </Text>
    </SafeAreaView>
  );
}
function Home(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Here is my Home Screen. I am bad at styling.</Text>
    </SafeAreaView>
  );
}
function MainStack(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Template" component={Home} />
        <Stack.Screen name="QRScanner" component={QRCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function App(): JSX.Element {
  return <MainStack />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  login: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  btntext: {
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '90%',
    margin: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
