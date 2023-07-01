import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

export default function QRCode({navigation}: any) {
  return (
    <SafeAreaView>
      <Text>Hello world</Text>
      <Button title="Home!" onPress={() => navigation.push('Other screen')} />
    </SafeAreaView>
  );
}
