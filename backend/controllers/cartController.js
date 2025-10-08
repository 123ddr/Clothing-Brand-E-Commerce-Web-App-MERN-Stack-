import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const getCart = async (req, res) => {
  const userId = req.user ? req.user._id : null;
  let cart = null;
  if (userId) cart = await Cart.findOne({ user: userId }).populate('items.product');
  else {
    // For demo: return empty for guest
    cart = { items: [] };
  }
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, size, qty } = req.body;
  const userId = req.user ? req.user._id : null;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (!userId) return res.status(200).json({ message: 'Guest cart supported on frontend' });

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });

  const existingIndex = cart.items.findIndex(i => i.product.equals(product._id) && i.size === size);
  if (existingIndex >= 0) {
    cart.items[existingIndex].qty += qty;
  } else {
    cart.items.push({ product: product._id, size, qty });
  }
  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
};

export const removeFromCart = async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user ? req.user._id : null;
  if (!userId) return res.status(200).json({ message: 'Guest cart handled on frontend' });

  let cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => !(i.product.equals(productId) && i.size === size));
  await cart.save();
  res.json(cart);
};
