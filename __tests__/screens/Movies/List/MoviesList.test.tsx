import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import router from '../../../../src/constants/router';
import MovieList from '../../../../src/screens/Movies/List';
import type { MoviesStackParamList } from '../../../../src/types/navigator';

import { moviesResponse } from '../../../../mocks/data/movies';
import useGetMovies from '../../../../src/hooks/movies/useGetMovies';
import useGetPopularMovies from '../../../../src/hooks/movies/useGetPopularMovies';

jest.mock('../../../../src/hooks/movies/useGetMovies');
jest.mock('../../../../src/hooks/movies/useGetPopularMovies');

jest.mock('../../../../src/components/Loading', () => () => <></>);

jest.mock('../../../../src/components/MovieCard', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ item, onPress }: any) => (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      testID={`movie-card-${item.id}`}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    FlashList: ({ data, renderItem }: any) => (
      <View>
        {data.map((item: any, index: number) => renderItem({ item, index }))}
      </View>
    ),
  };
});

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockPush = jest.fn();

const mockNavigation = {
  push: mockPush,
} as unknown as StackNavigationProp<MoviesStackParamList, typeof router.moviesList>;

const mockRoute: RouteProp<MoviesStackParamList, typeof router.moviesList> = {
  key: 'mock-key',
  name: router.moviesList,
};

describe('MovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('renders Loading when loading', () => {
    (useGetMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    (useGetPopularMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { queryByTestId } = render(
      <MovieList navigation={mockNavigation} route={mockRoute} />,
      { wrapper }
    );

    expect(queryByTestId('movie-card-1')).toBeNull();
  });

  it('renders list of movies when data is loaded', async () => {
    (useGetMovies as jest.Mock).mockReturnValue({
      data: moviesResponse.results,
      isLoading: false,
    });

    (useGetPopularMovies as jest.Mock).mockReturnValue({
      data: moviesResponse.results,
      isLoading: false,
    });

    render(<MovieList navigation={mockNavigation} route={mockRoute} />, {
      wrapper,
    });
    const cards = await screen.findAllByTestId(/movie-card-/);

    expect(cards.length).toBeGreaterThan(0);
  });

  it('navigates to movie details on card press', async () => {

    (useGetMovies as jest.Mock).mockReturnValue({
      data: moviesResponse.results,
      isLoading: false,
    });

    (useGetPopularMovies as jest.Mock).mockReturnValue({
      data: moviesResponse.results,
      isLoading: false,
    });

    render(<MovieList navigation={mockNavigation} route={mockRoute} />, {
      wrapper,
    });

    await expect(screen.findByTestId('movie-card-1119878')).rejects.toThrow();

    const cards = await screen.findAllByTestId('movie-card-1119878');
    expect(cards.length).toBeGreaterThan(0);
    fireEvent.press(cards[0]);

    expect(mockPush).toHaveBeenCalledWith(router.movieDetails, { movieId: 1119878 });
  });
});
