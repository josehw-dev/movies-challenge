import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

import styles from './styles';

const BottomTabNav = ({state, descriptors, navigation}) => { 
  return (
    <View row center paddingH-20 marginB-40 marginH-20 paddingV-10 style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const {icon, title} = options;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };


        return (
          <TouchableOpacity flex center key={index} onPress={onPress}>
            <MaterialIcons name={icon.name} size={20} color="black" />
            <Text marginT-4 marginB-6>
              {title}
            </Text>

            {isFocused ? (
              <View style={styles.focus} />
            ) : null}
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

export default memo(BottomTabNav);
