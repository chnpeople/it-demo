module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 10,
      propList: ['*'],
    },
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
  },
};
