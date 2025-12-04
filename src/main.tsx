import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx' 
import { createBrowserRouter, RouterProvider } from 'react-router'
import Products from './components/Products.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'
import Register from './components/Register.tsx'
import Login from './components/Login.tsx'
import Dashboard from './components/Dashboard.tsx'
import ProductEdit from './components/ProductEdit.tsx'
import NewProduct from './components/NewProduct.tsx'

const router = createBrowserRouter([ 
  {path:'/', element:<App />},
  {path:'/login', element:<Login />},
  {path:'/product', element:<NewProduct />},
  {path:'/products', element:<Products />}, 
  {path:'/products/:id', element:<ProductEdit />},
  {path:'/register', element:<Register />},
  {path:'/dashboard', element:<Dashboard />},
  {path:'*', element:<NotFoundPage />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
     <RouterProvider router={router} />   
  </StrictMode>,
)
