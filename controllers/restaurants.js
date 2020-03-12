import ErrorResponse from '../utils/errorResponse';
import Restaurant from '../models/Restaurant';

class RestaurantController {
  // @desc   GET all restaurants
  // @route  GET /api/v1/restaurants
  // @access Public
  static async getAllRestaurants(req, res, next) {
    try {
      const restaurants = await Restaurant.find();

      res.status(200).json({
        success: true,
        msg: 'All restaurants',
        count: restaurants.length,
        data: restaurants,
      });
    } catch (error) {
      next(error);
    }
  }

  // @desc   GET a single restaurant
  // @route  GET /api/v1/restaurants/:id
  // @access Public
  static async getRestaurant(req, res, next) {
    try {
      const restaurant = await Restaurant.findById(req.params.id);

      if (!restaurant) {
        return next(new ErrorResponse('Restaurant not found', 404));
      }

      res.status(200).json({
        success: true,
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  }

  // @desc   Create a new restaurant
  // @route  POST /api/v1/restaurants
  // @access Private
  static async createRestaurant(req, res, next) {
    try {
      const restaurant = await Restaurant.create(req.body);
      res.status(201).json({
        success: true,
        msg: 'Create a new restaurant',
        data: restaurant,
      });
    } catch (error) {
      next(error);
    }
  }

  // @desc   Update a single restaurant
  // @route  PUT /api/v1/restaurants/:id
  // @access Private
  static async updateRestaurant(req, res, next) {
    try {
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
    } catch (error) {
      next(error);
    }
  }

  // @desc   DELETE a restaurant
  // @route  DEL /api/v1/restaurants/:id
  // @access Private
  static async deleteRestaurant(req, res, next) {
    try {
      const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

      if (!restaurant) {
        return next(new ErrorResponse('Restaurant not found', 404));
      }

      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      next(error);
    }
  }
}

export default RestaurantController;
