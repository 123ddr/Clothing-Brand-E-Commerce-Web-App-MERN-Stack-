import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const createOrder = async (req, res) => {
  const user = req.user;
  const { items, totalPrice } = req.body;

  if (!user) return res.status(401).json({ message: 'Login required to place order' });

  const order = await Order.create({ user: user._id, items, totalPrice });

  // Clear cart
  await Cart.findOneAndDelete({ user: user._id });

  // send email (nodemailer) - using SMTP credentials from env
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const orderDate = new Date(order.orderDate).toLocaleString();
    const itemsHtml = items.map(i => `<li>${i.name} (size: ${i.size}) x ${i.qty} - $${i.price}</li>`).join('');
    const html = `<h3>Order Confirmation</h3>
      <p>Order ID: ${order._id}</p>
      <p>Order Date: ${orderDate}</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total: $${order.totalPrice}</strong></p>`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Order Confirmation',
      html
    });
  } catch (err) {
    console.warn('Failed to send email:', err.message);
  }

  res.status(201).json(order);
};

export const getOrdersForUser = async (req, res) => {
  const user = req.user;
  const orders = await Order.find({ user: user._id }).populate('items.product');
  res.json(orders);
};
