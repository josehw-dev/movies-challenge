import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import useGetPopularMovies from '@/src/hooks/movies/useGetPopularMovies';
import useGetMovies from '../../../hooks/movies/useGetMovies';

import Loading from '../../../components/Loading';
import MovieCard from "../../../components/MovieCard";

import router from '../../../constants/router';
import { Movie } from '../../../models/movies';

import { MoviesStackProps } from '../../../types/navigator';

import styles from './styles';

/**
 * Props for the MovieList.
 */
type Props = MoviesStackProps<router.moviesList>;
/**
 * MovieList screen displays a horizontal list of movies.
 *
 * @param {Props} props - Navigation props for the screen.
 * @returns {JSX.Element} The rendered movie list screen.
 */
const MovieList = ({navigation}: Props) => {
  const {data: nowPlayingData, isLoading: isLoadingMovies} = useGetMovies();
  const {data: popularMovies, isLoading: isLoadingPopular} = useGetPopularMovies();

  /**
   * Navigates to the movie details.
   *
   * @param {number} id - The ID of the selected movie.
   */
  const goToMovieDetails = (id: number) => {
    navigation.push(router.movieDetails, {
      movieId: id,
    });
  };

  /**
   * Renders a single movie item in the list.
   *
   * @param {{ item: Movie }} param
   * @returns {JSX.Element} The rendered MovieCard component.
   */
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

  if (isLoadingMovies || isLoadingPopular) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeArea]}>
      <View flex style={{backgroundColor: 'black'}}>
        <View paddingH-20>
          <View marginB-20>
            <Text white h2>Now Playing</Text>
          </View>

          <FlashList
            data={nowPlayingData}
            horizontal
            renderItem={renderItem}
            estimatedItemSize={240}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
          />
        </View>

        <View paddingH-20>
          <View marginB-20 marginT-30>
            <Text white h2>Popular</Text>
          </View>

          <FlashList
            horizontal
            data={popularMovies}
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
