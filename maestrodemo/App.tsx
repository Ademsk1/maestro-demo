/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, Pressable} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import QRCode from './OtherPage';

const Stack = createNativeStackNavigator();

function Login(): JSX.Element {
  return (
    <SafeAreaView style={styles.login}>
      <Text>You need to log in</Text>
      <Pressable style={styles.button}>
        <Text style={styles.text}>
          Click here to open a link to log in (boring)
        </Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>
          {' '}
          Biometric Authentication (Very cool, not boring)
        </Text>
      </Pressable>
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
        <Stack.Screen name="QR Scanner" component={QRCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function App(): JSX.Element {
  const [user, setUser] = useState(null);
  if (user) {
    return <MainStack />;
  } else {
    return <Login />;
  }
}

const styles = StyleSheet.create({
  login: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  text: {
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
    width: '75%',
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
