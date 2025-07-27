import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import useGetTvPopular from '@/src/hooks/tv/useGetTvPopular';

import Loading from '../../../components/Loading';
import MovieCard from "../../../components/MovieCard";

import router from '../../../constants/router';

import { TV } from '../../../models/tv';

import { TvStackProps } from '../../../types/navigator';

import styles from './styles';

/**
 * Props for the MovieList.
 */
type Props = TvStackProps<router.tvList>;
/**
 * MovieList screen displays a horizontal list of movies.
 *
 * @param {Props} props - Navigation props for the screen.
 * @returns {JSX.Element} The rendered movie list screen.
 */
const TvList = ({navigation}: Props) => {
  const {data: popularTvs, isLoading: isLoadingPopular} = useGetTvPopular();
  const {data: onAirTvs, isLoading: isLoadingOnAir} = useGetTvPopular();

  /**
   * Navigates to the movie details.
   *
   * @param {number} id - The ID of the selected movie.
   */
  const goToMovieDetails = (id: number) => {
    navigation.push(router.tvDetails, {
      tvId: id,
    });
  };

  /**
   * Renders a single movie item in the list.
   *
   * @param {{ item: Movie }} param
   * @returns {JSX.Element} The rendered MovieCard component.
   */
  const renderItem = ({item}: {item: TV}) => {
    return (
      <MovieCard
        item={item}
        key={item.id}
        onPress={goToMovieDetails}
        testID={`movie-card-${item.id}`}
      />
    );
  };

  if (isLoadingPopular || isLoadingOnAir) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeArea]}>
      <View flex style={{backgroundColor: 'black'}}>
        <View paddingH-20>
          <View marginB-20>
            <Text white h2>Popular</Text>
          </View>

          <FlashList
            data={popularTvs}
            horizontal
            renderItem={renderItem}
            estimatedItemSize={240}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
          />
        </View>

        <View paddingH-20>
          <View marginB-20 marginT-30>
            <Text white h2>On The Air</Text>
          </View>

          <FlashList
            horizontal
            data={onAirTvs}
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

export default TvList;
