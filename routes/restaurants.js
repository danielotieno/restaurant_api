import { Router } from 'express';
import asyncHandle from '../middleware/asyncHandler';
import RestaurantController from '../controllers/restaurants';

// Include other resource router
import menuRouter from './menus';

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  getRestaurantsInRadius,
  updateRestaurant,
  deleteRestaurant,
  restaurantPhotoUpload,
} = RestaurantController;

const router = Router();

// Re-Route into other resource router
router.use('/restaurants/:bootcamId/menus', menuRouter);

router.get(
  '/restaurants/radius/:zipcode/:distance',
  asyncHandle(getRestaurantsInRadius),
);
router.get('/restaurants', asyncHandle(getAllRestaurants));
router.get('/restaurants/:id', asyncHandle(getRestaurant));
router.post('/restaurants', asyncHandle(createRestaurant));
router.put('/restaurants/:id', asyncHandle(updateRestaurant));
router.put('/restaurants/:id/photo', asyncHandle(restaurantPhotoUpload));
router.delete('/restaurants/:id', asyncHandle(deleteRestaurant));

export default router;
