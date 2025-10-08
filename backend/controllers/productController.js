import Product from '../models/productModel.js';

// Create/search/filter/paginate
export const getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { search, category, size, minPrice, maxPrice } = req.query;
  const query = {};

  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } }
  ];
  if (category) query.category = category;
  if (size) query.sizes = size;
  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);

  const total = await Product.countDocuments(query);
  const products = await Product.find(query).skip(skip).limit(limit);

  res.json({ products, page, pages: Math.ceil(total / limit), total });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};
