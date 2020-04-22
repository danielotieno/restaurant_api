import ErrorResponse from '../utils/errorResponse';
import Menu from '../models/Menu';

class MenuController {
  // @desc   GET all menus
  // @route  GET /api/v1/menus
  // @route  GET /api/v1/restaurants/:restaurantId/menues
  // @access Public

  static async getMenus(req, res, next) {
    let query;

    if (req.params.restaurantId) {
      query = Menu.find({ restaurant: req.params.restaurantId });
    } else {
      query = Menu.find();
    }

    const menus = await query;

    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  }
}

export default MenuController;
