import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      started: '',
      results: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Results: ${this.state.results}`}</Text>
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