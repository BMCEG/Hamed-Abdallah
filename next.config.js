const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');

module.exports = {
  webpack5: false,
  images: { domains: ['images-uploads.fra1.digitaloceanspaces.com'] },
  env: {
    SPACES_ACCESS_KEY: 'I64WKTBWCDOCRZJ4E2LV',
    SPACES_SECRET_KEY: 'PPMIlXcD0iwPnSYnQBWA+yNTUOSe0JfnRdAf0fgygFk',
    MONGODB_URI:
      'mongodb+srv://ecomDev:ZEknPrfm0nudmFOu@cluster0.druxa.mongodb.net/hamed-prod?retryWrites=true&w=majority',
    JWT_SECRET:
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNjAzNTYwMywiaWF0IjoxNjM2MDM1NjAzfQ.pjdqjIb2Weut6eecX_78jnrF_9EIT-eWiAGJsUynL78',
  },
};
