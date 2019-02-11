import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/Home';
import OtherScreen from './src/screens/Other';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Other: { screen: OtherScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
