import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomTabNav from '../components/BottomTabNav';

import router from '../constants/router';
import type { BottomStackParams } from '../types/navigator';

import MovieStack from './MoviesNavigator';
import TvStack from './TvNavigator';

const Tab = createBottomTabNavigator<BottomStackParams>();

const options = {
  headerShown: false,
};

const BottomTabNavigator = () => {
  const initialScreen = router.movieStack;

  return (
    <Tab.Navigator
      screenOptions={options}
      initialRouteName={initialScreen}
      tabBar={(props) => <BottomTabNav {...props} />}
    >
      {/* Movie Stack */}
      <Tab.Screen
        name={router.movieStack}
        component={MovieStack}
        options={{
          icon: {
            name: 'theater',
          },
          title: 'Movies'
        }}
      />
      {/* TV List Screen */}
      <Tab.Screen
        name={router.tvShowsStack}
        component={TvStack}
        options={{
          icon: {
            name: 'youtube-tv',
          },
          title: 'TV Shows'
        }}
      />
    </Tab.Navigator>
  )
};

export default BottomTabNavigator;
