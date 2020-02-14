import Restaurant from '../models/Restaurant';

class RestaurantController {
  // @desc   GET all restaurants
  // @route  GET /api/v1/restaurants
  // @access Public
  static async getAllRestaurants(req, res, next) {
    try {
      const restaurants = await Restaurant.find();

      res
        .status(200)
        .json({ success: true, msg: 'All restaurants', data: restaurants });
    } catch (error) {
      res.statu(400).json({ success: false, error: error.errmsg });
    }
  }

  // @desc   GET a single restaurant
  // @route  GET /api/v1/restaurants/:id
  // @access Public
  static async getRestaurant(req, res, next) {
    try {
      const restaurant = await Restaurant.findById(req.params.id);

      if (!restaurant) {
        return res
          .status(404)
          .json({ success: false, msg: 'Restaurant not found' });
      }

      res.status(200).json({
        success: true,
        data: restaurant,
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.errmsg });
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
      res.status(400).json({ success: false, error: error.errmsg });
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
        return res
          .status(404)
          .json({ success: false, msg: 'Restaurant not found' });
      }

      res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
      res.status(400).json({ success: false, error: error.errmsg });
    }
  }

  // @desc   DELETE a restaurant
  // @route  DEL /api/v1/restaurants/:id
  // @access Private
  static deleteRestaurant(req, res, next) {
    res.status(200).json({
      success: true,
      msg: `Delete a single restaurant with id ${req.params.id}`,
    });
  }
}

export default RestaurantController;
