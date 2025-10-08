import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const [cart,setCart] = useState([])
  const nav = useNavigate()
  useEffect(()=> setCart(JSON.parse(localStorage.getItem('cart')||'[]')), [])
  const remove = i => {
    const c = [...cart]; c.splice(i,1); setCart(c); localStorage.setItem('cart', JSON.stringify(c));
  }
  const checkout = ()=> nav('/checkout')
  return (
    <div className="container">
      <h2>Cart</h2>
      {cart.length===0 ? <p>Cart empty</p> : (
        <div>
          {cart.map((it,idx)=>(<div key={idx} className="cart-item">
            <b>{it.name}</b> x {it.qty} - ${it.price} <button onClick={()=>remove(idx)}>Remove</button>
          </div>))}
          <button onClick={checkout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  )
}
