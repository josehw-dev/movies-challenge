import type { NavigationContainerRef } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

import router from '../constants/router';

/**
 * Global navigation reference type for imperative navigation (e.g., via `navigationRef.navigate()`).
 */
export type NavigationRef =
  NavigationContainerRef<ReactNavigation.RootParamList>;

/**
 * Defines all screen routes and their expected params for the app's main stack navigator.
 */
export type AppStackParamList = {
  /**
   * Movies list screen does not take any parameters.
   */
  [router.moviesList]: undefined;
  /**
   * Movie details screen requires a movie ID.
   */
  [router.movieDetails]: {
    /** The unique identifier for the movie to display. */
    movieId: number;
  };
};

/**
 * A strongly-typed version of React Navigation's StackScreenProps,
 * scoped to the AppStackParamList for a given route.
 *
 * @template T The name of the route in AppStackParamList.
 */
export type MoviesScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;
