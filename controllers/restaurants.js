import ErrorResponse from '../utils/errorResponse';
import geocoder from '../utils/geocoder';
import Restaurant from '../models/Restaurant';

class RestaurantController {
  // @desc   GET all restaurants
  // @route  GET /api/v1/restaurants
  // @access Public
  static async getAllRestaurants(req, res, next) {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      msg: 'All restaurants',
      count: restaurants.length,
      data: restaurants,
    });
  }

  // @desc   GET a single restaurant
  // @route  GET /api/v1/restaurants/:id
  // @access Public
  static async getRestaurant(req, res, next) {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(new ErrorResponse('Restaurant not found', 404));
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  }

  // @desc   Create a new restaurant
  // @route  POST /api/v1/restaurants
  // @access Private
  static async createRestaurant(req, res, next) {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
      success: true,
      msg: 'Create a new restaurant',
      data: restaurant,
    });
  }

  // @desc   Update a single restaurant
  // @route  PUT /api/v1/restaurants/:id
  // @access Private
  static async updateRestaurant(req, res, next) {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!restaurant) {
      return next(new ErrorResponse('Restaurant not found', 404));
    }

    res.status(200).json({ success: true, data: restaurant });
  }

  // @desc   DELETE a restaurant
  // @route  DEL /api/v1/restaurants/:id
  // @access Private
  static async deleteRestaurant(req, res, next) {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return next(new ErrorResponse('Restaurant not found', 404));
    }

    res.status(200).json({ success: true, data: {} });
  }

  // @desc   GET restaurants within a radius
  // @route  GET /api/v1/restaurants/:zipcode/:distance
  // @access Private
  static async getRestaurantsInRadius(req, res, next) {
    const { zipcode, distance } = req.params;

    // Get Lat/Long from geocoder

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calculate Radius using Radians
    // Divide distance by radius of earth
    const radius = distance / 6371;

    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius],
        },
      },
    });
    res
      .status(200)
      .json({ success: true, count: restaurants.length, data: restaurants });
  }
}

export default RestaurantController;
