import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { MoviesStackProps } from '../../../types/navigator';

import useGetMovieById from '../../../hooks/movies/useGetMovieById';

import { BASE_IMAGE_URL } from '../../../constants';
import router from '../../../constants/router';

import Loading from '../../../components/Loading';

import styles from './styles';

/**
 * Props for the MovieDetails.
 */
type Props = MoviesStackProps<router.movieDetails>;
/**
 * MovieDetails screen displays detailed information about a selected movie
 *
 * @param {Props} props - Screen props
 * @returns {JSX.Element} The rendered movie details screen.
 */
const MovieDetails = ({route, navigation}: Props) => {
  const {params} = route;
  const {movieId} = params;

  const {data, isLoading} = useGetMovieById(movieId);
  const {backdrop_path, title, overview} = data || {};
 
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
              {title}
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

export default MovieDetails;
