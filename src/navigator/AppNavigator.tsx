import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import router from '../constants/router';
import type { AppStackParamList } from '../types/navigator';

import MovieDetails from '../screens/Movies/Details';
import TvDetails from '../screens/Tv/Details';

import BottomNavigator from './BottomNavigator';

const AppStack = createStackNavigator<AppStackParamList>();

const options = {
  cardOverlayEnabled: true,
  cardStyle: {backgroundColor: 'black'},
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const optionsModal = {
  presentation: 'transparentModal',
  gestureEnabled: true,
  gestureDirection: 'vertical',
  cardStyle: {backgroundColor: 'black'},
  headerShown: false,
}

/**
 * Stack navigator for the main movie-related screens.
 * Includes Bottom tan Navigator and the modals for details.
 */

const AppNavigator: React.FC = () => {
  const initialScreen = router.bottomStack;

  return (
    <AppStack.Navigator initialRouteName={initialScreen}>
      <AppStack.Screen
        name={router.bottomStack}
        options={options}
        component={BottomNavigator}
      />

      {/* Movie Details Screen */}
      <AppStack.Screen
        options={optionsModal}
        component={MovieDetails}
        name={router.movieDetails}
      />

      {/* TV Details Screen */}
      <AppStack.Screen
        options={optionsModal}
        component={TvDetails}
        name={router.tvDetails}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
