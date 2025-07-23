import {createStackNavigator} from '@react-navigation/stack';

import type {AppStackParamList} from '../types/navigator';
import router from '../constants/router';

import MovieList from '../screens/Movies/List';
import MovieDetails from '../screens/Movies/Details';


const AppStack = createStackNavigator<AppStackParamList>();

const options = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'black'
  }
};

const AppNavigator = () => {
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
