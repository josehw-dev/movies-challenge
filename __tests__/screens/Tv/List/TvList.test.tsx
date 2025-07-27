import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import router from '../../../../src/constants/router';
import TvList from '../../../../src/screens/Tv/List';
import type { TvStackParamsList } from '../../../../src/types/navigator';

import { tvResponse } from '../../../../mocks/data/tvShows';
import useGetOnAir from '../../../../src/hooks/tv/useGetOnAir';
import useGetTvPopular from '../../../../src/hooks/tv/useGetTvPopular';

jest.mock('../../../../src/hooks/tv/useGetOnAir');
jest.mock('../../../../src/hooks/tv/useGetTvPopular');

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
} as unknown as StackNavigationProp<TvStackParamsList, typeof router.tvList>;

const mockRoute: RouteProp<TvStackParamsList, typeof router.tvList> = {
  key: 'mock-key',
  name: router.tvList,
};

describe('TvList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('renders Loading when loading', () => {
    (useGetTvPopular as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    (useGetOnAir as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { queryByTestId } = render(
      <TvList navigation={mockNavigation} route={mockRoute} />,
      { wrapper }
    );

    expect(queryByTestId('movie-card-1')).toBeNull();
  });

  it('renders list of movies when data is loaded', async () => {
    (useGetTvPopular as jest.Mock).mockReturnValue({
      data: tvResponse.results,
      isLoading: false,
    });

    (useGetOnAir as jest.Mock).mockReturnValue({
      data: tvResponse.results,
      isLoading: false,
    });

    render(<TvList navigation={mockNavigation} route={mockRoute} />, {
      wrapper,
    });
    const cards = await screen.findAllByTestId(/movie-card-/);

    expect(cards.length).toBeGreaterThan(0);
  });

  it('navigates to movie details on card press', async () => {
    (useGetTvPopular as jest.Mock).mockReturnValue({
      data: tvResponse.results,
      isLoading: false,
    });

    (useGetOnAir as jest.Mock).mockReturnValue({
      data: tvResponse.results,
      isLoading: false,
    });

    render(<TvList navigation={mockNavigation} route={mockRoute} />, {
      wrapper,
    });

    await expect(screen.findByTestId('movie-card-93405')).rejects.toThrow();

    const cards = await screen.findAllByTestId('movie-card-93405');
    expect(cards.length).toBeGreaterThan(0);
    fireEvent.press(cards[0]);

    expect(mockPush).toHaveBeenCalledWith(router.tvDetails, { tvId: 93405 });
  });
});
