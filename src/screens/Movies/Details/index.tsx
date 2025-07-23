import {View, Text, Image} from 'react-native-ui-lib';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {MoviesScreenProps} from '../../../types/navigator';

import useGetMovieById from '../../../hooks/movies/useGetMovieById';

import {Movie} from '../../../models/movies';
import router from '../../../constants/router';
import {BASE_IMAGE_URL} from '../../../constants';

import Loading from '../../../components/Loading';

import styles from './styles';

type Props = MoviesScreenProps<router.movieDetails>;
const MovieDetails = ({route}: Props) => {
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
        <Image marginB-20 source={{uri: `${BASE_IMAGE_URL}/${backdrop_path}`}} style={{width: '100%', height: 300}} />
        
        <View flex paddingH-20>
          <ScrollView style={{flex: 1}}>
            <Text center white marginB-10>
              {title}
            </Text>

            <Text white>
              {overview}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;
