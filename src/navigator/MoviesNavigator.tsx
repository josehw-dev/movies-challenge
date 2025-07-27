import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import router from '../constants/router';
import type { MoviesStackParamList } from '../types/navigator';

import MovieList from '../screens/Movies/List';

const AppStack = createStackNavigator<MoviesStackParamList>();

const options = {
  cardOverlayEnabled: true,
  cardStyle: {backgroundColor: 'black'},
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

/**
 * Stack navigator for the movies screens.
 */
const MovieNavigator: React.FC = () => {
  const initialScreen = router.moviesList;

  return (
    <AppStack.Navigator initialRouteName={initialScreen}>
      <AppStack.Screen
        name={router.moviesList}
        options={options}
        component={MovieList}
      />
    </AppStack.Navigator>
  );
};

export default MovieNavigator;