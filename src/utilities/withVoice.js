import React from 'react';
import Voice from 'react-native-voice';

const withVoice = (WrappedComponent) => {
  class HOC extends React.Component {

    constructor(props) {
      super(props);

      // Initial state
      this.state = {
        started: false,
        results: [],
        totalResults: []
      };

      // Bindings
      Voice.onSpeechStart = this.onSpeechStart.bind(this);
      Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    }

    // Lifecycle
    componentDidMount() {
      this._startRecognizing();
    }

    componentWillUnmount() {
      Voice.destroy().then(Voice.removeAllListeners);
    }

    // Event Handlers
    onSpeechStart(e) {
      this.setState({
        started: true
      });
    }

    onSpeechPartialResults(e) {
      let speech = e.value[0].toLowerCase().split(" ").slice(-1)[0];

      if (speech.includes("next")) {
        this.props.navigation.navigate('Other', {});
        this.setState({
          results: '',
          totalResults: e.value
        });
      } else if (speech.includes("back")) {
        this.props.navigation.navigate('Home', {});
        this.setState({
          results: '',
          totalResults: e.value
        });
      }
    }

    // Voice
    async _startRecognizing(e) {
      this.setState({
        started: true,
        results: []
      });

      try {
        await Voice.start('en-US');
      } catch (e) {
        console.error(e);
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          started = {this.state.started}
          results = {this.state.results}
          totalResults = {this.state.totalResults}
        />
      );
    }
  }

  return HOC;
}

export default withVoice;