import React from 'react';
import Voice from 'react-native-voice';

const withVoice = (WrappedComponent) => {
  class HOC extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        started: '',
        results: []
      };

      // Bindings
      Voice.onSpeechStart = this.onSpeechStart.bind(this);
      Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    }

    // Lifecycle
    componentDidMount() {
      const didFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
          console.log("didFocus");
          // this._startRecognizing();
          console.debug('didBlur', payload);
        }
      );

      const willBlurSubscription = this.props.navigation.addListener(
        'willBlur',
        payload => {
          console.log("willBlur");
          // this._destroyRecognizer();
          Voice.destroy().then(Voice.removeAllListeners);
          console.debug('willBlur', payload);
        }
      );
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
      let speech = e.value[0].toLowerCase();

      if (speech.includes("next")) {
        this.props.navigation.navigate('Step1', {});
        this._stopRecognizing();

      }
      this.setState({
        results: e.value,
      });
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

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  }

  return HOC;
}

export default withVoice;