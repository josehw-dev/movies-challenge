import 'dotenv/config';

export default () => ({
  expo: {
    name: 'movieschallange',
    slug: 'movieschallange',
    version: '1.0.0',
    extra: {
      apiKey: process.env.API_KEY,
    },
  },
});
