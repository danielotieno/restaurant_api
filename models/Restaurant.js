import mongoose from 'mongoose';
import slugify from 'slugify';

import geocoder from '../utils/geocoder';

// Declare the Schema of the Mongo model
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a restaurant name'],
    unique: true,
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a restaurant description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  website: {
    type: String,
    match: [
      // eslint-disable-next-line no-useless-escape
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    zipcode: String,
    country: String,
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create slug from Restaurant name
RestaurantSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode and create location field
RestaurantSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Export the model
module.exports = mongoose.model('Restaurant', RestaurantSchema);
