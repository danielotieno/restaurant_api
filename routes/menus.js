import { Router } from 'express';
import asyncHandle from '../middleware/asyncHandler';
import MenuController from '../controllers/menus';

import Menu from '../models/Menu';
import advancedSearch from '../middleware/advancedSearch';

const {
  getMenus,
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  menuPhoto,
} = MenuController;

const router = Router({ mergeParams: true });

router.post('/menus', asyncHandle(addMenu));
router.get(
  '/menus',
  advancedSearch(Menu, {
    path: 'restaurant',
    select: 'name description website',
  }),
  asyncHandle(getMenus),
);
router.get('/menus/:id', asyncHandle(getMenu));
router.put('/menus/:id', asyncHandle(updateMenu));
router.put('/menus/:id/photo', asyncHandle(menuPhoto));
router.delete('/menus/:id', asyncHandle(deleteMenu));

export default router;
