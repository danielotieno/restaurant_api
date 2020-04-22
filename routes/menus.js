import { Router } from 'express';
import asyncHandle from '../middleware/asyncHandler';
import MenuController from '../controllers/menus';

const { getMenus } = MenuController;

const router = Router({ mergeParams: true });

router.get('/menus', asyncHandle(getMenus));

export default router;
