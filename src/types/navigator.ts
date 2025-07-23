import type { NavigationContainerRef } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import router from '../constants/router';

export type NavigationRef =
  NavigationContainerRef<ReactNavigation.RootParamList>;

export type AppStackParamList = {
  [router.moviesList]: undefined;
  [router.movieDetails]: {
    movieId: number;
  };
};

export type MoviesScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;
