import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Inicio from './pages/Inicio.jsx'
import Inicio2 from './pages/Inicio2.jsx'
import Consulta from './pages/Consulta.jsx'
import Login from './pages/Login.jsx'
import Professor from './pages/Professor/Professor.jsx'
import Professores from './pages/Professor/Professores.jsx'
import Aluno from './pages/Aluno/Aluno.jsx'
import Alunos from './pages/Aluno/Alunos.jsx'
import CadastrarAluno from './pages/Aluno/CadastrarAluno.jsx'
import ExcluirAluno from './pages/Aluno/ExcluirAluno.jsx'
import Livro from './pages/Livro/Livro.jsx'
import Livros from './pages/Livro/Livros.jsx'
import EditarAluno from './pages/Aluno/Editar/EditarAluno.jsx'
import EdicaoAluno from './pages/Aluno/Editar/EdicaoAluno.jsx'
import CadastrarProfessor from './pages/Professor/CadastrarProfessor.jsx'
import EditarProfessor from './pages/Professor/Editar/EditarProfessor.jsx'
import EdicaoProfessor from './pages/Professor/Editar/EdicaoProfessor.jsx'
import ExcluirProfessor from './pages/Professor/ExcluirProfessor.jsx'
import CadastrarLivro from './pages/Livro/CadastrarLivro.jsx'
import EditarLivro from './pages/Livro/Editar/EditarLivro.jsx'
import ExcluirLivro from './pages/Livro/ExcluirLivro.jsx'
import EdicaoLivro from './pages/Livro/Editar/EdicaoLivro.jsx'
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
        <Route path="/inicio2" element={<Inicio2 />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/cadastraaluno" element={<CadastrarAluno />} />
        <Route path="/excluialuno" element={<ExcluirAluno />} />
        <Route path="/editaaluno" element={<EditarAluno />} />
        <Route path="/edicaoaluno" element={<EdicaoAluno />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/cadastraprof" element={<CadastrarProfessor />} />
        <Route path="/editaprof" element={<EditarProfessor />} />
        <Route path="/edicaoprof" element={<EdicaoProfessor />} />
        <Route path="/excluiprof" element={<ExcluirProfessor />} />
        <Route path="/cadastralivro" element={<CadastrarLivro />} />
        <Route path="/editalivro" element={<EditarLivro />} />
        <Route path="/edicaolivro" element={<EdicaoLivro />} />
        <Route path="/excluilivro" element={<ExcluirLivro />} />
        <Route path="/livro" element={<Livro />} />
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


