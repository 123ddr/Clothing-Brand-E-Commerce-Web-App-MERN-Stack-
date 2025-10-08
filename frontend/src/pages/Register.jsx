import React, {useState} from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState(''), [email,setEmail]=useState(''), [password,setPassword]=useState('')
  const nav = useNavigate()
  const submit = async e => {
    e.preventDefault()
    try{
      const { data } = await API.post('/users/register', { name, email, password })
      localStorage.setItem('token', data.token)
      alert('Registered')
      nav('/products')
    }catch(err){ alert('Register failed') }
  }
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
