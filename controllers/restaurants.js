class RestaurantController {
  // @desc   GET all restaurants
  // @route  GET /api/v1/restaurants
  // @access Public
  static getAllRestaurants(req, res, next) {
    res.status(200).json({ success: true, msg: 'Show all restaurants' });
  }

  // @desc   GET a single restaurant
  // @route  GET /api/v1/restaurants/:id
  // @access Public
  static getRestaurant(req, res, next) {
    res.status(200).json({
      success: true,
      msg: `Show a single restaurant ${req.params.id}`,
    });
  }

  // @desc   Create a new restaurant
  // @route  POST /api/v1/restaurants
  // @access Private
  static createRestaurant(req, res, next) {
    res.status(200).json({ success: true, msg: 'Create a new restaurant' });
  }

  // @desc   Update a single restaurant
  // @route  PUT /api/v1/restaurants/:id
  // @access Private
  static updateRestaurant(req, res, next) {
    res.status(200).json({
      success: true,
      msg: `Update the restaurant with id ${req.params.id}`,
    });
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
