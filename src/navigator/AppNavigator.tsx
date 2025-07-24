import { createStackNavigator } from '@react-navigation/stack';

import router from '../constants/router';
import type { AppStackParamList } from '../types/navigator';

import MovieDetails from '../screens/Movies/Details';
import MovieList from '../screens/Movies/List';


const AppStack = createStackNavigator<AppStackParamList>();

const options = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'black'
  }
};

/**
 * Stack navigator for the main movie-related screens.
 * Includes Movie List and Movie Details screens.
 */

const AppNavigator: React.FC = () => {
  const initialScreen = router.moviesList;

  return (
    <AppStack.Navigator initialRouteName={initialScreen}>
      {/* Movie List Screen */}
      <AppStack.Screen
        options={options}
        component={MovieList}
        name={router.moviesList}
      />

      {/* Movie Details Screen */}
      <AppStack.Screen
        options={options}
        component={MovieDetails}
        name={router.movieDetails}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
