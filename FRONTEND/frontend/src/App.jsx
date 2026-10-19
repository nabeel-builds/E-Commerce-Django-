import {useEffect, useState} from 'react'

function App() {

const [products, setProducts] = useState([])

useEffect(() => {
  async function fetchMessage(){
    try{
      const response = await fetch('http://127.0.0.1:8000/api/products/')
      if(!response.ok){
        throw new Error("Failed to fetch")
      }
      const data = await response.json()
      setProducts(data)
    }catch(err){
      console.error(err)
    }
  }
  fetchMessage()
},[])

  return (
    <div className='min-h-screen bg-gray-100 text-gray-800'>
      <h1 className='text-3xl font-bold underline'>Product List</h1>
      <div className='container mx-auto p-4'>
        {products.map(product => (
          <div key={product.id} className='bg-white p-4 rounded shadow mb-4'>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-gray-800 font-bold'>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App