# React Native Voice Navigation Example

A simple project to describe integrating the React Native Voice and React Navigation libraries.

Feel free to open an issue if you see something I messed up or you're having trouble getting set up.

## Prerequisites

* Some basic knowledge of React and/or React Native
* Install node, through `nvm` or however you prefer.
* Install XCode and the XCode command line tools (if compiling to iOS)
* Install Android Studio (if compiling to Android)
* Install Homebrew

NOTE: XCode and Android Studio can take a long time to download and take a significant amount of disk space (14gb for XCode at the time of this writing).

## Basic Setup

I have not tried this with the Expo approach that React Native now recommends in their [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide. Instead we will be running an app with native code abilities because it is highly likely that any significant voice application would require some of this. [There are some other limitations to Expo](https://docs.expo.io/versions/v31.0.0/introduction/why-not-expo/), but in general it is a good place for React Native beginnners to start. That said, we're skipping it.

### Dependencies

Install [Watchman](https://facebook.github.io/watchman), recommended for watching filesystem changes.

    brew install watchman

Install the React Native CLI.

    npm install -g react-native-cli

### Build

#### iOS

This command will run a build, run the [Metro bundler](https://github.com/facebook/metro), and open the iOS simulator.

    react-native run-ios

#### Android

A similar command will run a build for Android, however I also recommend opening the project in Android Studio and running directly from there as there seem to be some issues currently (especially when building for the first time).

    react-native run-android

## Project Overview

### package.json

In our dependency manifest we've added two packages, [react-native-voice](https://github.com/wenkesj/react-native-voice) and [react-navigation](https://github.com/react-navigation/react-navigation).

    "dependencies": {
      "react": "16.6.3",
      "react-native": "0.58.4",
      "react-native-voice": "^0.2.6",
      "react-navigation": "^3.2.1"
    },

Make sure these are installed using `npm install` or `yarn`.

### Screens

The whole point of our application is to be able to navigate between screens using voice commands so there are two nearly identical screens so that we can do just that. You'll find these at `src/screens/Home.js` and `src/screens/Other.js`.

    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
      <Text style={styles.stat}>{`Started: ${this.props.started}`}</Text>
      <Text style={styles.stat}>{`Results: ${this.props.totalResults}`}</Text>
    </View>

Just a simple view with some text and some props that we'll populate with results from our voice recognition. You'll see some styles in there as well as importing our main `withVoice.js` component which will be discussed shortly.

    import withVoice from '../utilities/withVoice';

### App.js

The main entrypoint for the application. Here is where we create the main stack navigator for the application using React Navigation. A stack navigator is simply a way to handle navigation between screens while also keeping a record of navigation history so that commands like "back" can be recognized and handled.

    const MainNavigator = createStackNavigator({
      Home: { screen: HomeScreen },
      Other: { screen: OtherScreen },
    });

    const App = createAppContainer(MainNavigator);

Our imported screens are assigned to names so that we will be able to refer to them by such while navigating.

### withVoice Higher Order Component

The main voice recognition functionality for the application. For those who do not know about higher order components there are several links in the Resources section below that I found helpful. For our purposes here it is a way of providing shared functionality among components. We want to wrap both of our screens in our Voice recognition functionality so we'll be using one here.

    const withVoice = (WrappedComponent) => {
      class HOC extends React.Component {

      // [...]

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

As we can see the higher order component takes in a component and returns a component wrapped in the behavior we want and with some added props from the state of the voice component.

Our basic lifecycle methods start the voice recognition and destroy the listeners respectively on mount and dismount.

    // Lifecycle
    componentDidMount() {
      this._startRecognizing();
    }

    componentWillUnmount() {
      Voice.destroy().then(Voice.removeAllListeners);
    }

The main functionality comes in the `onSpeechPartialResults` handler which fires when a new word or phrase is recognized by the voice recognition. The "partial" here refers to speech recognition being ongoing rather than having completed. This allows us to react quicker and not have to start and stop the recognition repeatedly.

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

The current results are reported as a space-separated string inside an array, so we'll do a little parsing with `split` and some normalization with `toLowerCase`. We'll `slice` the last word since we only care about one word commands. I'm 100% certain there is a cleaner and more code-golfy way to do this but it works.

If our parsed speech recognition contains either of our command words, we navigate to the corresponding screen using React Navigation's default `navigate` command which will either add to the navigation stack or remove from it depending on whether you are going to a screen for the first time or returning to it.

## Final Thoughts

And that's about it! Pretty simple for something that can seem daunting like speech recognition. Of course things get more complicated as you increase to more commands and more screens but a simple example can get the point across.

Some real world things to consider:

1. While voice recognition is pretty good by default on both iOS and Android, it's not perfect. If your command-space is small you can maintain a dictionary of "sound alikes" that also trigger your commands, for example "necks" could also trigger you "next" command and so on. I found in my own experience that this can take accuracy from 90% to 99% which has a significant effect on user experience.
2. Backgound noise and audio coming from the device speakers are both still significant problems that are one of the major reasons why companies like Apple and Amazon rely on "wake words" to know when to begin officially listening and trying to hear commands. Keep this in mind if you expect your app to be used in noisy conditions or in conjunction with audio playing from your app.

## Caveats

We have to specify in the iOS configuration that we want access to both the microphone and the voice recognition abilities, so make sure to include this in your project if you are starting your own. Failure to do so can cause the application to crash silently in recent versions of iOS.

    // iOS/VoiceNavigation/Info.plist
    <xmp>
      <key>NSMicrophoneUsageDescription</key>
      <string>Description of why you require the use of the microphone</string>
      <key>NSSpeechRecognitionUsageDescription</key>
      <string>Description of why you require the use of the speech recognition</string>
    </xmp>

## Resources

* [React Native - Getting Started](https://facebook.github.io/react-native/docs/getting-started)
* [Why not Expo?][https://docs.expo.io/versions/v31.0.0/introduction/why-not-expo/]
* [Very simple higher order component example](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775)
* [What is the difference between a HOC and a container component in ReactJS?](https://www.quora.com/What-is-the-difference-between-a-HOC-and-a-container-component-in-ReactJS)
* [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)