import { Router } from 'express';
import asyncHandle from '../middleware/asyncHandler';
import MenuController from '../controllers/menus';

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
router.get('/menus', asyncHandle(getMenus));
router.get('/menus/:id', asyncHandle(getMenu));
router.put('/menus/:id', asyncHandle(updateMenu));
router.put('/menus/:id/photo', asyncHandle(menuPhoto));
router.delete('/menus/:id', asyncHandle(deleteMenu));

export default router;
