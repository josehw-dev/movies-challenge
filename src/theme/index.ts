import { Typography } from 'react-native-ui-lib';

const Fonts = {
  h1: 32,
  h2: 24,
  h3: 20,
  p1: 16,
  p2: 14,
  p3: 12,
  p4: 10,
};

Typography.loadTypographies({
  h1: {
    fontSize: Fonts.h1,
    letterSpacing: 0,
    lineHeight: Fonts.h1 * 1.28575,
  },
  h2: {
    fontSize: Fonts.h2,
    letterSpacing: 0.15,
    lineHeight: Fonts.h2 * 1.25,
  },
  h3: {
    fontSize: Fonts.h3,
    letterSpacing: 0.5,
    lineHeight: Fonts.h3 * 1.3,
  },
  p1: {
    fontSize: Fonts.p1,
    lineHeight: Fonts.p1 * 1.5,
  },
  p2: {
    fontSize: Fonts.p2,
    lineHeight: Fonts.p2 * 1.715,
  },
  p3: {
    fontSize: Fonts.p3,
    lineHeight: Fonts.p3 * 1.335,
  },
  p4: {
    fontSize: Fonts.p4,
    lineHeight: Fonts.p4 * 1.6,
  },
});