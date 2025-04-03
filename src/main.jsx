import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Inicio from './pages/Inicio.jsx'
import Consulta from './pages/Consulta.jsx'
import Login from './pages/Login.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const rotas = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Consulta/>} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/inicio" element={<Inicio />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas}/>
  </StrictMode>
);  


