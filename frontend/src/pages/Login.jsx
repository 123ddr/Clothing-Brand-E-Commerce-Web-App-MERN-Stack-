import React, {useState} from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState(''), [password,setPassword]=useState('')
  const nav = useNavigate()
  const submit = async e => {
    e.preventDefault()
    try{
      const { data } = await API.post('/users/login', { email, password })
      localStorage.setItem('token', data.token)
      alert('Logged in')
      nav('/products')
    }catch(err){ alert('Login failed') }
  }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
