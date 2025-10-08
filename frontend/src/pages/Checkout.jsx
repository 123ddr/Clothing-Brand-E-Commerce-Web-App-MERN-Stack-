import React from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const nav = useNavigate()
  const doCheckout = async () => {
    const token = localStorage.getItem('token')
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    if (!token){ alert('Please login to place order'); nav('/login'); return }
    const items = cart.map(c=> ({ product: c.productId, name: c.name, price: c.price, size: c.size, qty: c.qty }) )
    const totalPrice = cart.reduce((s,c)=>s + c.price * c.qty, 0)
    try {
      await API.post('/orders', { items, totalPrice })
      localStorage.removeItem('cart')
      alert('Order placed. Check your email for confirmation.')
      nav('/products')
    } catch (err) { alert('Checkout failed') }
  }
  return <div className="container"><h2>Checkout</h2><button onClick={doCheckout}>Place Order (Mock)</button></div>
}
