/* eslint-disable no-underscore-dangle */
import path from 'path';
import ErrorResponse from '../utils/errorResponse';
import geocoder from '../utils/geocoder';
import Restaurant from '../models/Restaurant';

class RestaurantController {
  // @desc   GET all restaurants
  // @route  GET /api/v1/restaurants
  // @access Public
  static async getAllRestaurants(req, res, next) {
    let query;

    const reqQuery = { ...req.query };

    // Fields to exclude

    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over Remove Fileds and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    // eslint-disable-next-line prefer-const
    query = Restaurant.find(JSON.parse(queryStr)).populate('menus');

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');

      query = query.select(fields);
    }

    // Sort Fields
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Restaurant.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const restaurants = await query;

    // Pagination Results
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      msg: 'All restaurants',
      count: restaurants.length,
      pagination,
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
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(new ErrorResponse('Restaurant not found', 404));
    }

    restaurant.remove();

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

  // @desc   Upload photo for a restaurant
  // @route  PUT /api/v1/restaurants/:id/photo
  // @access Private
  static async restaurantPhotoUpload(req, res, next) {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(new ErrorResponse('Restaurant not found', 404));
    }

    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const { file } = req.files;

    // make sure the uploaded image is actualy an image
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check File Size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
          400,
        ),
      );
    }

    file.name = `photo_${restaurant._id}${path.parse(file.name).ext}`;

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

export default RestaurantController;
