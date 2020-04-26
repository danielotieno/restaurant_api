/* eslint-disable no-underscore-dangle */
import path from 'path';
import ErrorResponse from '../utils/errorResponse';
import Menu from '../models/Menu';
import Restaurant from '../models/Restaurant';

class MenuController {
  // @desc   GET all menus
  // @route  GET /api/v1/menus
  // @route  GET /api/v1/restaurants/:restaurantId/menues
  // @access Public

  static async getMenus(req, res, next) {
    if (req.params.restaurantId) {
      const menus = await Menu.find({ restaurant: req.params.restaurantId });
      return res.status(200).json({
        success: true,
        count: menus.length,
        data: menus,
      });
    }
    res.status(200).json(res.advancedSearch);
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

  // @desc   Upload photo for a menu
  // @route  PUT /api/v1/menus/:id/photo
  // @access Private
  static async menuPhoto(req, res, next) {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return next(new ErrorResponse('Menu not found', 404));
    }

    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const { file } = req.files;

    // Check File Size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
          400,
        ),
      );
    }

    file.name = `photo_${menu._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        return next(new ErrorResponse('Problem with file upload', 500));
      }

      await Restaurant.findByIdAndUpdate(req.params.id, { photo: file.name });

      res.status(200).json({
        success: true,
        date: file.name,
      });
    });
  }
}

export default MenuController;
