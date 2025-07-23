import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import router from '../../../app/constants/router';
import MovieList from '../../../app/screens/Movies/List';
import type { AppStackParamList } from '../../../app/types/navigator';

import useGetMovies from '../../../app/hooks/movies/useGetMovies';
import { navigation } from '../../testUtils';

jest.mock('../../../src/hooks/movies/useGetMovies');

jest.mock('../../../src/components/Loading', () => () => <></>);

jest.mock('../../../src/components/MovieCard', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ item, onPress }: any) => (
    <TouchableOpacity onPress={() => onPress(item.id)} testID={`movie-card-${item.id}`}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('@shopify/flash-list', () => {
  return {
    FlashList: ({ data, renderItem }: any) => {
      return data.map((item: any, index: number) => renderItem({ item, index }));
    },
  };
});

const mockNavigation = navigation as unknown as StackNavigationProp<AppStackParamList, typeof router.moviesList>;

const mockRoute: RouteProp<AppStackParamList, typeof router.moviesList> = {
  key: 'mock-key',
  name: router.moviesList,
};

describe('MovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Loading when loading', () => {
    (useGetMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const {queryByTestId} = render(<MovieList navigation={mockNavigation} route={mockRoute} />);
    
    expect(queryByTestId('movie-card-1')).toBeNull();
  });

  it('renders list of movies when data is loaded', async () => {
    const movies = [
      {id: 1, title: 'Movie 1'},
      {id: 2, title: 'Movie 2'},
    ];

    (useGetMovies as jest.Mock).mockReturnValue({
      data: movies,
      isLoading: false,
    });

    const {getByTestId} = render(<MovieList navigation={mockNavigation} route={mockRoute} />);

    await waitFor(() => {
      expect(getByTestId('movie-card-1')).toBeTruthy();
      expect(getByTestId('movie-card-2')).toBeTruthy();
    });
  });

  it('navigates to movie details on card press', () => {
    const movies = [
      {
        id: 123,
        title: 'My Movie',
        backdrop_path: 'some-image.jpg',
      },
    ];

    (useGetMovies as jest.Mock).mockReturnValue({
      data: movies,
      isLoading: false,
    });

    const {getByTestId} = render(<MovieList navigation={mockNavigation} route={mockRoute} />);

    fireEvent.press(getByTestId('movie-card-123'));

    expect(mockNavigation.push).toHaveBeenCalledWith('movieDetails', {
      movieId: 123,
    });
  });
});
