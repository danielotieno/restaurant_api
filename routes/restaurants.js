import { Router } from 'express';
import RestaurantController from '../controllers/restaurants';

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = RestaurantController;

const router = Router();

router.get('/restaurants', getAllRestaurants);

router.get('/restaurants/:id', getRestaurant);

router.post('/restaurants', createRestaurant);

router.put('/restaurants/:id', updateRestaurant);

router.delete('/restaurants/:id', deleteRestaurant);

export default router;
