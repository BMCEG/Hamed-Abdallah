const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');

module.exports = {
  webpack5: false,
  env: {
    MONGODB_URI: `'mongodb+srv://ecomDev:ZEknPrfm0nudmFOu@cluster0.druxa.mongodb.net/ecom-dev?retryWrites=true'`,
    JWT_SECRET:
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNjAzNTYwMywiaWF0IjoxNjM2MDM1NjAzfQ.pjdqjIb2Weut6eecX_78jnrF_9EIT-eWiAGJsUynL78',
  },
};
