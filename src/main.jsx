import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Inicio from './pages/Inicio.jsx'
import Consulta from './pages/Consulta.jsx'
import Login from './pages/Login.jsx'
import Professores from './pages/Professor/Professores.jsx'
import Alunos from './pages/Aluno/Alunos.jsx'
import CadastrarAluno from './pages/Aluno/CadastrarAluno.jsx'
import Livros from './pages/Livro/Livros.jsx'
import CadastraProfessor from './pages/Professor/CadastraProfessor.jsx'
import CadastrarLivro from './pages/Livro/CadastrarLivro.jsx'
import Page404 from './pages/Page404.jsx'
import Layout from './pages/Layout.jsx'
import Emprestimo from './pages/Emprestimo/Emprestimo.jsx'
import CadastrarEmprestimo from './pages/Emprestimo/CadastrarEmprestimo.jsx'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const rotas = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route index element={<Consulta/>} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/cadastraaluno" element={<CadastrarAluno />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/cadastraprof" element={<CadastraProfessor />} />
        <Route path="/cadastralivro" element={<CadastrarLivro />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/emprestimos" element={<Emprestimo />} />
        <Route path="/cadastraemprestimo" element={<CadastrarEmprestimo />} />
      </Route>
    <Route path='*' element={<Page404/>} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas}/>
  </StrictMode>
);


