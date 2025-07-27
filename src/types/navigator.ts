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
   * Movies bottom stack.
   */
  [router.bottomStack]: undefined;

  /**
   * Movie details Modal screen requires a movie ID.
   */
  [router.movieDetails]: {
    /** The unique identifier for the movie to display. */
    movieId: number;
  };

  /**
   * TV details Modal screen requires a tc ID.
   */
  [router.tvDetails]: {
    /** The unique identifier for the tv to display. */
    tvId: number;
  };
};

export type BottomStackParams = {
  /**
   * Movies list screen does not take any parameters.
   */
  [router.movieStack]: undefined;
  /**
   * Tv list screen does not take any parameters.
   */
  [router.tvShowsStack]: undefined;
};

export type MoviesStackParamList = {
  /**
   * Movies list screen does not take any parameters.
   */
  [router.moviesList]: undefined;
  /**
   * Movie details Modal screen requires a movie ID.
   */
  [router.movieDetails]: {
    /** The unique identifier for the tv to display. */
    movieId: number;
  };
};

export type TvStackParamsList = {
  /**
   * TV list screen does not take any parameters.
   */
  [router.tvList]: undefined;
  /**
   * TV details Modal screen requires a tv ID.
   */
  [router.tvDetails]: {
    /** The unique identifier for the tv to display. */
    tvId: number;
  };
}

/**
 * A strongly-typed version of React Navigation's StackScreenProps,
 * scoped to the MoviesStackParamList for a given route.
 *
 * @template T The name of the route in MoviesStackParamList.
 */
export type MoviesStackProps<T extends keyof MoviesStackParamList> =
  StackScreenProps<MoviesStackParamList, T>;

/**
 * A strongly-typed version of React Navigation's StackScreenProps,
 * scoped to the MoviesStackParamList for a given route.
 *
 * @template T The name of the route in MoviesStackParamList.
 */
export type TvStackProps<T extends keyof TvStackParamsList> =
  StackScreenProps<TvStackParamsList, T>;
