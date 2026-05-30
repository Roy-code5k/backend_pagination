import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [skip, setSkip] = useState(0)
  const limit = 10

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        const data = await response.json()
        setProducts(data.products)
        setTotal(data.total)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [skip])

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(skip / limit) + 1

  return (
    <div className="App">
      <h1>Backend Pagination</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => setSkip(prev => prev - limit)} 
              disabled={skip === 0}
            >
              Previous
            </button>
            
            <span style={{ margin: '0 10px' }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => setSkip(i * limit)}
                  style={{
                    margin: '0 2px',
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    backgroundColor: currentPage === i + 1 ? '#ddd' : 'white'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </span>

            <button 
              onClick={() => setSkip(prev => prev + limit)} 
              disabled={skip + limit >= total}
            >
              Next
            </button>
          </div>
          
          <p>Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} products</p>
        </>
      )}
    </div>
  )
}

export default App
