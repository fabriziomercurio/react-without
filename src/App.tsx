import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <Navbar /> 
    <div className="container mb-5">
      <Login />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>   
    </div>   
    </>
  )
}

export default App
