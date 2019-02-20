import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import withVoice from '../utilities/withVoice';

class OtherScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Other screen!</Text>
        <Text style={styles.stat}>{`Started: ${this.props.started}`}</Text>
        <Text style={styles.stat}>{`Results: ${this.props.results}`}</Text>
      </View>
    );
  }
}

export default withVoice(OtherScreen);

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