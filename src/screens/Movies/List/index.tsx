import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import useGetMovies from '../../../hooks/movies/useGetMovies';

import Loading from '../../../components/Loading';
import MovieCard from "../../../components/MovieCard";

import router from '../../../constants/router';
import { Movie } from '../../../models/movies';

import { MoviesScreenProps } from '../../../types/navigator';

import styles from './styles';

/**
 * Props for the MovieList.
 */
type Props = MoviesScreenProps<router.moviesList>;
/**
 * MovieList screen displays a horizontal list of movies.
 *
 * @param {Props} props - Navigation props for the screen.
 * @returns {JSX.Element} The rendered movie list screen.
 */
const MovieList = ({navigation}: Props) => {
  const {data, isLoading} = useGetMovies();

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
