import ErrorResponse from '../utils/errorResponse';
import Menu from '../models/Menu';
import Restaurant from '../models/Restaurant';

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
      query = Menu.find().populate({
        path: 'restaurant',
        select: 'name description website',
      });
    }

    const menus = await query;

    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  }

  // @desc   GET single menu
  // @route  GET /api/v1/:id
  // @access Public

  static async getMenu(req, res, next) {
    const menu = await Menu.findById(req.params.id).populate({
      path: 'restaurant',
      select: 'name description website',
    });

    if (!menu) {
      return next(new ErrorResponse('No Menu with such id'), 404);
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  }

  // @desc   Create a menu
  // @route  POST /api/v1/restaurants/restaurantId/menus
  // @access Private

  static async addMenu(req, res, next) {
    req.body.restaurant = req.params.restaurantId;

    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant) {
      return next(new ErrorResponse('No Restaurant found with such id'), 404);
    }

    const menu = await Menu.create(req.body);

    res.status(200).json({
      success: true,
      data: menu,
    });
  }

  // @desc   Update a menu
  // @route  Put /api/v1/menus/:id
  // @access Private

  static async updateMenu(req, res, next) {
    let menu = await Menu.findById(req.params.id);

    if (!menu) {
      return next(new ErrorResponse('No Menu found with such id'), 404);
    }

    menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: menu,
    });
  }

  // @desc   Delete a menu
  // @route  DEL /api/v1/menus/:id
  // @access Private

  static async deleteMenu(req, res, next) {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return next(new ErrorResponse('No Menu found with such id'), 404);
    }

    await menu.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  }
}

export default MenuController;
