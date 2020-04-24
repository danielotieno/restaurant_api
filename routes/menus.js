import { Router } from 'express';
import asyncHandle from '../middleware/asyncHandler';
import MenuController from '../controllers/menus';

const { getMenus, getMenu, addMenu } = MenuController;

const router = Router({ mergeParams: true });

router.get('/menus', asyncHandle(getMenus));
router.get('/menus/:id', asyncHandle(getMenu));
router.post('/menus', asyncHandle(addMenu));

export default router;
