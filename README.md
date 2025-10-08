# Clothing Brand E-Commerce Web App (MERN Stack)

## **Objective**
A fully functional e-commerce web application for a fictional clothing brand built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  

Users can browse clothing items, register & log in, manage a shopping cart, and complete a mock checkout process.  

---

## **Features**

### **1. User Accounts & Authentication**
- Users can **register** (name, email, password) and **log in**.
- Passwords are **securely hashed using bcrypt**.
- JWT-based authentication protects restricted routes.

### **2. Product Management**
- Clothing catalog with **seeded items** (minimum 20 products).
- Each item includes:  
  - Name  
  - Description  
  - Price  
  - Image URL  
  - Category (Men/Women/Kids)  
  - Sizes (S/M/L/XL)
- Product detail page available for each item.

### **3. Search, Filters & Pagination**
- Search products by name or description.
- Filter by category, size, and price range.
- Multiple filters can be applied simultaneously.
- Pagination support: `?page=1&limit=10`.

### **4. Shopping Cart**
- Add clothing items to the cart with selected size.
- Update quantities and remove items.
- Cart is **saved per user**.
- Users can add items even without logging in.

### **5. Checkout & Orders**
- Mock checkout (no real payment integration).
- Orders are saved in MongoDB with:  
  - User reference  
  - Items purchased (sizes & quantities)  
  - Total price  
  - Order date

### **6. Order Confirmation Email**
- After checkout, the app sends an **email confirmation** using Nodemailer.  
- Email includes:  
  - Order summary (products, sizes, quantities, total)  
  - Order ID  
  - Order date

---

## **Demo Products**
- Includes T-shirts, Jackets, Jeans, Dresses, Hoodies, etc.  
- **Minimum 20 products** seeded in the database.

---

## **Tech Stack**
- **Frontend:** React, React Router, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JWT & bcrypt  
- **Email:** Nodemailer  
- **Deployment:** Local development (localhost)
