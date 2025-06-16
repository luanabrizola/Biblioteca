import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Componente CardUsuario com funcionalidades de ver mais, editar e excluir
function CardUsuario({
  id_usuario,
  registro_academico,
  nome,
  data_nascimento,
  email,
  telefone,
  is_ativo, // adiciona aqui
  onExcluir,
  onAtualizar,
}) {
  const [verMais, setVerMais] = useState(false);
  const [editar, setEditar] = useState(false);

  const [form, setForm] = useState({
    nome,
    registro_academico,
    data_nascimento,
    email,
    telefone,
    is_ativo, // inicializa aqui
  });

  // Fecha modal de detalhes
  const handleClose = () => {
    setVerMais(false);
  };

  // Atualiza o estado do formulário
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Salvar alterações feitas no usuário
  async function handleSalvar() {
    try {
      const resposta = await fetch("http://localhost:3333/atualizarUsuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario,
          ...form,
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar usuário");

      const dados = await resposta.json();
      onAtualizar(dados.usuario);
      setEditar(false);
      setVerMais(false);
    } catch (erro) {
      alert("Erro ao atualizar usuário");
      console.error(erro);
    }
  }

  return (
    <div className="flex flex-col bg-white w-[33%] h-auto mb-5 rounded-md p-4">
      <h1 className="text-xl font-bold mb-2 text-center break-words">{nome}</h1>
      <p>
        <span className="font-bold">Registro Acadêmico:</span> {registro_academico}
      </p>
      <p className="mb-2">
        <span className="font-bold">Curso:</span>
      </p>

      {verMais && !editar && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[35%] flex">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-2xl font-bold mb-8 text-center">{nome}</h1>
              <div className="flex flex-col">
                <p className="mb-2">
                  <span className="font-bold">Registro Acadêmico:</span> {registro_academico}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Data de Nascimento:</span> {data_nascimento}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Telefone:</span> {telefone}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Curso:</span>
                </p>
              </div>
              <div className="flex mt-5 w-full justify-end">
                <button
                  onClick={handleClose}
                  className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2 cursor-pointer hover:bg-[#5b3011]/80 transition-colors duration-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editar && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[35%] flex flex-col gap-3">
            <h2 className="text-xl font-bold mb-4 text-center">Editar Usuário</h2>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="registro_academico"
              value={form.registro_academico}
              onChange={handleChange}
              placeholder="Registro Acadêmico"
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              placeholder="Data de Nascimento"
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Telefone"
              className="border p-2 rounded"
            />
            {/* Se quiser controlar ativo/inativo no form, pode adicionar um checkbox aqui */}
            {/* <label>
              Ativo:
              <input
                type="checkbox"
                name="is_ativo"
                checked={form.is_ativo}
                onChange={(e) => setForm(prev => ({ ...prev, is_ativo: e.target.checked }))}
              />
            </label> */}
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setEditar(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setVerMais(!verMais)}
        className="text-black underline font-bold mt-2 cursor-pointer hover:text-[#5b3011] transition-colors duration-300"
      >
        {verMais ? "Ver menos" : "Ver mais"}
      </button>

      <div className="flex space-x-3 mt-2">
        <span
          className="material-icons cursor-pointer hover:text-gray-500 transition-colors duration-300"
          onClick={() => {
            setEditar(true);
            setVerMais(false);
          }}
          title="Editar"
        >
          edit
        </span>
        <span
          className="material-icons cursor-pointer hover:text-pink-500 transition-colors duration-300"
          onClick={() => onExcluir(id_usuario)}
          title="Excluir"
        >
          delete
        </span>
      </div>
    </div>
  );
}

// Componente principal que lista e gerencia alunos
function Alunos() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const resposta = await fetch("http://localhost:3333/listarUsuarios");
        if (!resposta.ok) throw new Error("Erro ao buscar alunos");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error("Erro ao carregar alunos:", erro);
      }
    }

    carregarAlunos();
  }, []);

  // Excluir usuário da lista e do backend
  const handleExcluirUsuario = async (id_usuario) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este aluno?");
    if (!confirmar) return;

    try {
      const resposta = await fetch("http://localhost:3333/removerUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_usuario }),
      });

      const json = await resposta.json();
      console.log("Usuário excluído:", json);

      setUsuarios((prev) => prev.filter((user) => user.id_usuario !== id_usuario));
    } catch (erro) {
      console.error("Erro ao excluir aluno:", erro);
      alert("Erro ao excluir aluno.");
    }
  };

  // Atualiza o usuário na lista após edição
  const handleAtualizarUsuario = (usuarioAtualizado) => {
    setUsuarios((prev) =>
      prev.map((user) =>
        user.id_usuario === usuarioAtualizado.id_usuario ? usuarioAtualizado : user
      )
    );
  };

  return (
    <div className="flex flex-1 min-h-screen font-poppins bg-[#f0e7c2]">
      <div className="w-full px-10 flex flex-col items-center">
        <form className="flex w-full justify-center gap-4 mt-12 mb-14">
          <input
            className="bg-[#5b3011]/48 rounded-full w-[74%] h-12 text-white placeholder:text-[#5b3011]/44 px-3"
            type="text"
            placeholder="O que você procura?"
          />
          <button className="bg-[#5b3011]/48 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer">
            <span className="material-icons">search</span>
          </button>
          <Link
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 font-poppins px-3 cursor-pointer flex items-center"
            to="/cadastraaluno"
          >
            <i className="material-icons mr-3">add</i>
            <span className="text-center">Cadastrar</span>
          </Link>
        </form>

        <div className="flex gap-4 mb-4 font-semibold">
          <button>Nome</button>
          <button>Curso</button>
          <button>Data de Nascimento</button>
          <button>Email</button>
          <button></button>
        </div>

        <div className="flex flex-col w-[90%] rounded-md mt-10 mb-5">
          <div className="flex justify-center gap-5 flex-wrap">
            {usuarios
              .filter((user) => user.tipo === "aluno")
              .map((user) => (
                <CardUsuario
                  key={user.id_usuario}
                  id_usuario={user.id_usuario}
                  registro_academico={user.registro_academico}
                  nome={user.nome}
                  data_nascimento={user.data_nascimento}
                  email={user.email}
                  telefone={user.telefone}
                  is_ativo={user.is_ativo} // passa o is_ativo aqui também
                  onExcluir={handleExcluirUsuario}
                  onAtualizar={handleAtualizarUsuario}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alunos;