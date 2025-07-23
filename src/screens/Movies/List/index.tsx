import {SafeAreaView} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {View, Text} from 'react-native-ui-lib';

import useGetMovies from '../../../hooks/movies/useGetMovies';

import Loading from '../../../components/Loading';
import MovieCard from "../../../components/MovieCard";

import {Movie} from '../../../models/movies';
import router from '../../../constants/router';

import {MoviesScreenProps} from '../../../types/navigator';

import styles from './styles';

type Props = MoviesScreenProps<router.moviesList>;
const MovieList = ({navigation}: Props) => {
  const {data, isLoading} = useGetMovies();

  const goToMovieDetails = (id: number) => {
    navigation.push(router.movieDetails, {
      movieId: id,
    });
  };

  const renderItem = ({item}: {item: Movie}) => {
    return (
      <MovieCard
        item={item}
        key={item.id}
        onPress={goToMovieDetails}
        testID={`movie-card-${item.id}`}
      />
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View flex>
        <View flex paddingH-20>
          <View marginB-20 marginT-30>
            <Text white h2>Now Playing</Text>
          </View>

          <FlashList
            data={data}
            horizontal
            renderItem={renderItem}
            estimatedItemSize={180}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieList;
