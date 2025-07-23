import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import MovieCard from '../../app/components/MovieCard';
import { BASE_IMAGE_URL } from '../../app/constants';

describe('MovieCard', () => {
  const mockOnPress = jest.fn();
  const movie = {
    id: 123,
    title: 'My Movie',
    backdrop_path: 'path/to/image.jpg',
  };

  it('renders correctly with given props', () => {
    const {getByText, getByTestId} = render(
      <MovieCard item={movie} onPress={mockOnPress} testID="movie-card" />
    );

    expect(getByTestId('movie-card')).toBeTruthy();
    expect(getByText('My Movie')).toBeTruthy();

    const image = getByTestId('movie-card').findByType('Image');
    expect(image.props.source.uri).toBe(`${BASE_IMAGE_URL}/${movie.backdrop_path}`);
  });

  it('calls onPress with movie id when pressed', () => {
    const {getByTestId} = render(
      <MovieCard item={movie} onPress={mockOnPress} testID="movie-card" />
    );

    fireEvent.press(getByTestId('movie-card'));
    expect(mockOnPress).toHaveBeenCalledWith(movie.id);
  });
});
