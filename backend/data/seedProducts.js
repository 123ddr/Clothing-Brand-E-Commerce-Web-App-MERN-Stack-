import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';
import connectDB from '../config/db.js';

dotenv.config();
const products = [
  { name: 'Classic White T-Shirt', description: 'Comfortable cotton tee', price: 15, image: '', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Blue Denim Jacket', description: 'Stylish denim jacket', price: 60, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Black Hoodie', description: 'Cozy hoodie', price: 35, image: '', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Red Dress', description: 'Elegant red dress', price: 50, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Summer Floral Dress', description: 'Light summer dress', price: 45, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Slim Jeans', description: 'Denim slim fit', price: 40, image: '', category: 'Men', sizes: ['M','L'] },
  { name: 'Chino Pants', description: 'Casual chinos', price: 38, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Leather Jacket', description: 'Premium faux leather', price: 120, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Kids Graphic Tee', description: 'Fun print for kids', price: 12, image: '', category: 'Kids', sizes: ['S','M'] },
  { name: 'Kids Hoodie', description: 'Warm kids hoodie', price: 25, image: '', category: 'Kids', sizes: ['S','M'] },
  { name: 'White Sneakers', description: 'Classic sneakers', price: 70, image: '', category: 'Unisex', sizes: ['M','L'] },
  { name: 'Black Leggings', description: 'Stretchy leggings', price: 22, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Puffer Jacket', description: 'Warm winter jacket', price: 95, image: '', category: 'Women', sizes: ['M','L'] },
  { name: 'Crewneck Sweater', description: 'Wool blend sweater', price: 48, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Button Shirt', description: 'Formal shirt', price: 30, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Striped Polo', description: 'Casual polo shirt', price: 28, image: '', category: 'Men', sizes: ['M','L'] },
  { name: 'Midi Skirt', description: 'Comfortable skirt', price: 34, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Denim Shorts', description: 'Summer shorts', price: 25, image: '', category: 'Women', sizes: ['S','M'] },
  { name: 'Track Pants', description: 'Athletic track pants', price: 27, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Bomber Jacket', description: 'Classic bomber', price: 85, image: '', category: 'Men', sizes: ['M','L','XL'] }
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
