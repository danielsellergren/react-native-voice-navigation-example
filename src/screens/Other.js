import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class OtherScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Other screen!</Text>
        <Button
          onPress={this.startListening}
          title="Voice"
          color="#841584"
          accessibilityLabel="Start Listening"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});