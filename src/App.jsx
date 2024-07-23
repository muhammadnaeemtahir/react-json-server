import { useEffect } from "react"
import { useState } from "react"

function App() {
  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError('')
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/products`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const products = await response.json()
      setProducts(products)
      console.log(products)
    } catch (error) {
      setProducts(null)
      setError('Sorry, there was an error fetching products')
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1>Hello, JSON-Server!</h1>

      {
        isLoading && (
          <p style={{ color: 'orange' }}>Loading...</p>
        )
      }

      {
        error && (
          <p style={{ color: 'red' }}>{error}</p>
        )
      }

      {products &&
        <ul>
          {
            products.length > 0 && products.map(product => (
              <li key={product.id} style={{ marginBottom: '2rem' }}>
                <p>
                  <strong>Tite: </strong> {product.title}
                </p>
                <p>
                  <strong>Category: </strong> {product.category}
                </p>
                <p>
                  <strong>Price: </strong> {product.price}
                </p>
              </li>
            ))
          }
        </ul>
      }

    </>
  )
}

export default App
