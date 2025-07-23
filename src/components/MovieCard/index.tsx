import {Text, Image, TouchableOpacity, Card} from 'react-native-ui-lib';

import {Movie} from '../../models/movies';
import {BASE_IMAGE_URL} from '../../constants';

import styles from './styles';

type Props = {
  item: Movie;
  onPress: (id: number) => void;
  testID?: string;
};

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
