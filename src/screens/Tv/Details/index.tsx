import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { TvStackProps } from '../../../types/navigator';

import useGetTvById from '../../../hooks/tv/useGetTvById';

import { BASE_IMAGE_URL } from '../../../constants';
import router from '../../../constants/router';

import Loading from '../../../components/Loading';

import styles from './styles';

/**
 * Props for the Tv Details.
 */
type Props = TvStackProps<router.tvDetails>;
/**
 * Tv Details screen displays detailed information about a selected movie
 *
 * @param {Props} props - Screen props
 * @returns {JSX.Element} The rendered tv details screen.
 */
const TvDetails = ({route, navigation}: Props) => {
  const {params} = route;
  const {tvId} = params;

  const {data, isLoading} = useGetTvById(tvId);
  const {backdrop_path, name, overview} = data || {};
 
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.flex}>
      <StatusBar barStyle="light-content" />
      <View flex>
        <View paddingT-20 marginR-20 style={{position: 'absolute', zIndex: 100, right: 0}}>
          <TouchableOpacity onPress={navigation.goBack}>
            <MaterialIcons name="close" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <Image marginB-20 source={{uri: `${BASE_IMAGE_URL}/${backdrop_path}`}} style={{width: '100%', height: 300}} />
        
        <View flex paddingH-20>
          <ScrollView style={{flex: 1}}>
            <Text center white marginB-20 h2>
              {name}
            </Text>

            <Text white p2>
              {overview}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TvDetails;
