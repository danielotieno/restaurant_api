import { Router } from 'express';
import asyncHandle from '../middleware/asyncHandler';
import RestaurantController from '../controllers/restaurants';

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = RestaurantController;

const router = Router();

router.get('/restaurants', asyncHandle(getAllRestaurants));

router.get('/restaurants/:id', asyncHandle(getRestaurant));

router.post('/restaurants', asyncHandle(createRestaurant));

router.put('/restaurants/:id', asyncHandle(updateRestaurant));

router.delete('/restaurants/:id', asyncHandle(deleteRestaurant));

export default router;
