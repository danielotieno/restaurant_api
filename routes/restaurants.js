import { Router } from 'express';

const router = Router();

router.get('/restaurants', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all restaurants' });
});

router.get('/restaurants/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show a single restaurant ${req.params.id}` });
});

router.post('/restaurants', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create a new resturant' });
});

router.put('/restaurants/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update the restaurant with id ${req.params.id}`,
  });
});

router.delete('/restaurants/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete a single restaurant with id ${req.params.id}`,
  });
});

export default router;
