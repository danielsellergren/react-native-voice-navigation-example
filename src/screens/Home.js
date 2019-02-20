import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import withVoice from '../utilities/withVoice';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
        <Text style={styles.stat}>{`Started: ${this.props.started}`}</Text>
        <Text style={styles.stat}>{`Results: ${this.props.totalResults}`}</Text>
      </View>
    );
  }
}

export default withVoice(HomeScreen);

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