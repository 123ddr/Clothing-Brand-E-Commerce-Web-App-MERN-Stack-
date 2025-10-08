import React, {useEffect, useState} from 'react'
import API from '../api/api'

export default function Products(){
  const [products,setProducts] = useState([])
  useEffect(()=>{ API.get('/products').then(r=>setProducts(r.data.products)).catch(()=>{}) },[])
  return (
    <div className="container">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p=>(
          <div key={p._id} className="card">
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>${p.price}</p>
            <button onClick={()=> {
              const cart = JSON.parse(localStorage.getItem('cart')||'[]');
              cart.push({ productId: p._id, name: p.name, price: p.price, size: p.sizes?.[0]||'M', qty:1 });
              localStorage.setItem('cart', JSON.stringify(cart));
              alert('Added to cart (guest). Login to save cart to your account.');
            }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
