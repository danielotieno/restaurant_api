import restaurants from './restaurants';
import menus from './menus';
import errorHandler from '../middleware/error';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, restaurants);
  app.use(apiPrefix, menus);

  app.use(errorHandler);

  app.use('*', (req, res) =>
    res.status(404).json({
      message: 'Kindly, check if your URL is correct.',
    }),
  );

  return app;
};

export default routes;
