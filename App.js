import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Voice from 'react-native-voice';

export default class App extends React.Component {

  // Initial state and constructor
  state = {
    started: '',
    results: []
  };

  constructor(props) {
    super(props);

    this.state = {
      started: false,
      results: []
    };

    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
  }

  // Lifecycle
  componentDidMount() {
    console.log("componentDidMount");
    this._startRecognizing();
  }

  // Voice
  async _startRecognizing(e) {
    this.setState({
      results: []
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  // Event handlers
  onSpeechStart(e) {
    this.setState({
      started: true
    });
  }

  onSpeechPartialResults(e) {
    console.log("Partial Results");
    console.log(e.value);
    this.setState({
      results: e.value
    });
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
