import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx' 
import { createBrowserRouter, RouterProvider } from 'react-router'
import Product from './components/Product.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'

const router = createBrowserRouter([ 
  {path:'/', element:<App />},
  {path:'/products', element:<Product />},
  {path:'*', element:<NotFoundPage />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
     <RouterProvider router={router} />   
  </StrictMode>,
)
