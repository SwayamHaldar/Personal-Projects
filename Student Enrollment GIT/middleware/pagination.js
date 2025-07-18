export default function page(req, res, next) {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  req.pagination = { limit, page, offset };
  next();
}
