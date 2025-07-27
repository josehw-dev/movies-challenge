import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { mock_movie_one } from '../../mocks/data/movie';
import MovieCard from '../../src/components/MovieCard';
import { BASE_IMAGE_URL } from '../../src/constants';

describe('MovieCard', () => {
  const mockOnPress = jest.fn();

  it('renders correctly with given props', () => {
    const {getByText, getByTestId} = render(
      <MovieCard item={mock_movie_one} onPress={mockOnPress} testID="movie-card" />
    );

    expect(getByTestId('movie-card')).toBeTruthy();
    expect(getByText(mock_movie_one.title)).toBeTruthy();

    const image = getByTestId('movie-card').findByType('Image');
    expect(image.props.source.uri).toBe(`${BASE_IMAGE_URL}/${mock_movie_one.poster_path}`);
  });

  it('calls onPress with movie id when pressed', () => {
    const {getByTestId} = render(
      <MovieCard item={mock_movie_one} onPress={mockOnPress} testID="movie-card" />
    );

    fireEvent.press(getByTestId('movie-card'));
    expect(mockOnPress).toHaveBeenCalledWith(mock_movie_one.id);
  });
});
