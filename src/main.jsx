import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Inicio from './pages/Inicio.jsx'
import Consulta from './pages/Consulta.jsx'
import Login from './pages/Login.jsx'
import Professor from './pages/Professor.jsx'
import Aluno from './pages/Aluno.jsx'
import CadastrarAluno from './pages/CadastrarAluno.jsx'
import ExcluirAluno from './pages/ExcluirAluno.jsx'
import Livro from './pages/Livro.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const rotas = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Consulta/>} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/aluno" element={<Aluno />} />
      <Route path="/professor" element={<Professor />} />
      <Route path="/cadastraaluno" element={<CadastrarAluno />} />
      <Route path="/excluialuno" element={<ExcluirAluno />} />
      <Route path="/livro" element={<Livro />} />
      

    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas}/>
  </StrictMode>
);  


