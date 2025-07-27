import { Card, Image, Text, TouchableOpacity } from 'react-native-ui-lib';

import { BASE_IMAGE_URL } from '../../constants';
import { Movie } from '../../models/movies';
import { TV } from '../../models/tv';

import styles from './styles';

/**
 * Props for the MovieCard.
 */
type Props = {
  /** Movie data to render in the card. */
  item: Movie | TV;

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
  const {poster_path, title, id, name} = item;

  return (
    <TouchableOpacity
      testID={testID}
      marginR-20
      onPress={() => onPress(id)}
      style={styles.container}>
      <Card>
        <Image source={{uri: `${BASE_IMAGE_URL}/${poster_path}`}} style={{...styles.image, resizeMode: 'cover'}} />
      </Card>
      <Text center marginT-20 numberOfLines={2} white p3 style={styles.title}>
        {title || name}
      </Text>
    </TouchableOpacity>
  );
};

export default MovieCard;
