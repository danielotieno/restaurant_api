import NodeGeocoder from 'node-geocoder';

const options = {
  provider: process.env.GEOCODER_PROVIDER,

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
