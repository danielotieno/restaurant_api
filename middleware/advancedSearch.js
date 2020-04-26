const advancedSearch = (model, populate) => async (req, res, next) => {
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
  query = model.find(JSON.parse(queryStr));

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
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

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

  res.advancedSearch = {
    success: true,
    count: results.length,
    pagination,
    date: results,
  };

  next();
};

export default advancedSearch;
