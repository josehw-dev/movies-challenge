import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import router from '../constants/router';
import type { TvStackParamsList } from '../types/navigator';

import TvList from '../screens/Tv/List';

const AppStack = createStackNavigator<TvStackParamsList>();

const options = {
  cardOverlayEnabled: true,
  cardStyle: {backgroundColor: 'black'},
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

/**
 * Stack navigator for the tv screens.
 */
const TvNavigator: React.FC = () => {
  const initialScreen = router.tvList;

  return (
    <AppStack.Navigator initialRouteName={initialScreen}>
      <AppStack.Screen
        name={router.tvList}
        options={options}
        component={TvList}
      />
    </AppStack.Navigator>
  );
};

export default TvNavigator;