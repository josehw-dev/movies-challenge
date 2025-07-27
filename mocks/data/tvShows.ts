import {
  mock_tv_one,
  mock_tv_two
} from './tv';

export const tvResponse = {
  dates: {
    "maximum": "2025-07-30",
    "minimum": "2025-06-18"
  },
  page: 1,
  results: [mock_tv_one, mock_tv_two],
  total_pages: 211,
  total_results: 4203
};
