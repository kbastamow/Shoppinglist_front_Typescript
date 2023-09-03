import React from 'react'
import { useNavigate } from 'react-router'

const ShoppingComplete = () => {
    const navigate = useNavigate()
    setTimeout(() => {
        navigate("/home")
    }, 5000)

  return (
    <div>Shopping Complete!</div>
  )
}

export default ShoppingComplete