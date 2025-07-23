import {ActivityIndicator} from 'react-native';
import {View} from 'react-native-ui-lib';

const Loading = () => {
  return (
    <View flex center>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
