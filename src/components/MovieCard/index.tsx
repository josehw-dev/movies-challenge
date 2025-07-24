import { Card, Image, Text, TouchableOpacity } from 'react-native-ui-lib';

import { BASE_IMAGE_URL } from '../../constants';
import { Movie } from '../../models/movies';

import styles from './styles';

/**
 * Props for the MovieCard.
 */
type Props = {
  /** Movie data to render in the card. */
  item: Movie;

  /** Callback invoked when the card is pressed, passing the movie ID. */
  onPress: (id: number) => void;

  /** Optional test identifier for testing frameworks. */
  testID?: string;
};

/**
 * MovieCard displays a movie's image and title inside a clickable card.
 * 
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered MovieCard.
 */
const MovieCard = ({item, onPress, testID}: Props) => {
  const {backdrop_path, title, id} = item;

  return (
    <TouchableOpacity
      testID={testID}
      marginR-20
      onPress={() => onPress(id)}
      style={styles.container}>
      <Card paddingB-20>
        <Image source={{uri: `${BASE_IMAGE_URL}/${backdrop_path}`}} style={styles.image} />
        <Text center marginT-20>{title}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;
