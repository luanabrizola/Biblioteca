import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardUsuario({
  id_usuario,
  registro_academico,
  nome,
  data_nascimento,
  email,
  telefone,
  tipo,
  cursos = [],
  is_ativo,
  onExcluir,
  onAtualizar,
  onVerHistorico,
}) {
  const [verMais, setVerMais] = useState(false);
  const [editar, setEditar] = useState(false);
  const [todosCursos, setTodosCursos] = useState([]);
  const [cursosSelecionados, setCursosSelecionados] = useState(cursos.map(c => c.id_curso));


  const [form, setForm] = useState({
    nome,
    registro_academico,
    data_nascimento,
    email,
    telefone,
    is_ativo,
    tipo,
  });

  useEffect(() => {
    setCursosSelecionados(cursos.map(c => c.id_curso));
    setForm((prev) => ({
      ...prev,
      nome,
      registro_academico,
      data_nascimento,
      email,
      telefone,
      is_ativo,
      tipo,
    }));
  }, [cursos, nome, registro_academico, data_nascimento, email, telefone, is_ativo, tipo]);

  const handleClose = () => {
    setVerMais(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    async function carregarCursos() {
      try {
        const res = await fetch("http://localhost:3333/listarCursos");
        if (!res.ok) throw new Error("Erro ao buscar cursos");
        const dados = await res.json();
        setTodosCursos(dados);
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      }
    }

    carregarCursos();
  }, []);

  async function carregarCursosDoUsuario(id_usuario) {
    try {
      const res = await fetch(`http://localhost:3333/listarCursosDoUsuario/${id_usuario}`);
      if (!res.ok) throw new Error("Erro ao buscar cursos do usuário");
      const cursos = await res.json();
      return cursos;
    } catch {
      return [];
    }
  }

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
          id_cursos: cursosSelecionados
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar usuário");

      const dados = await resposta.json();
      const cursosAtualizados = await carregarCursosDoUsuario(dados.usuario.id_usuario);
      const usuarioAtualizadoComCursos = {
        ...dados.usuario,
        cursos: cursosAtualizados,
      };
      onAtualizar(usuarioAtualizadoComCursos);
      setEditar(false);
      setVerMais(false);
    } catch (erro) {
      alert("Erro ao atualizar usuário: " + erro.message);
      console.error("handleSalvar", erro);
    }
  }

  return (
    <div className="flex flex-col bg-white w-[28%] h-auto mb-5 rounded-md p-4">
      <h1 className="text-xl font-bold mb-2 text-center break-words">{nome}</h1>
      <p>
        <span className="font-bold">Registro Acadêmico:</span> {registro_academico}
      </p>
      <p className="mb-2">
        <span className="font-bold">Curso(s):</span>{" "}
        {cursos.length > 0 ? cursos.map(c => c.nome).join(", ") : "Nenhum curso cadastrado"}
      </p>
      <button
        onClick={() => onVerHistorico(id_usuario)}
        className="mt-2 bg-[#5b3011]/48 text-white rounded-full px-3 py-1 hover:bg-[#5b3011]/80 transition"
      >
        Ver histórico
      </button>

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
                  <span className="font-bold">Data de Nascimento:</span> {new Date(data_nascimento).toLocaleDateString("pt-BR")}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Telefone:</span> {telefone}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Curso(s):</span>{" "}
                  {cursos.length > 0 ? cursos.map(c => c.nome).join(", ") : "Nenhum curso cadastrado"}
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
          <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[35%] flex flex-col items-center gap-3">
            <div className="flex items-center mt-2">
              <img src="/img/iconeAlunoo.png" alt="" className="w-18 h-18 mr-4" />
              <h1 className="border-b border-gray-300 my-4 text-4xl text-[#331a08] font-semibold">Editar</h1>
            </div>
            <div className="w-full px-16 mb-4">
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center mb-2 px-5">
                <label className="mr-2">Cursos:</label>
                <select
                  className="h-full w-full bg-transparent outline-none"
                  value={cursosSelecionados}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions);
                    const valores = options.map(o => parseInt(o.value));
                    setCursosSelecionados(valores);
                  }}
                >
                  {todosCursos.map(curso => (
                    <option key={curso.id_curso} value={curso.id_curso}>
                      {curso.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Registro:</label>
                <input
                  type="text"
                  name="registro_academico"
                  value={form.registro_academico}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2 w-[25%]">Data Nasc:</label>
                <input
                  type="date"
                  name="data_nascimento"
                  value={form.data_nascimento}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5">
                <label className="mr-2">Telefone:</label>
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setEditar(false)}
                className="bg-gray-500 text-white w-28 h-10 rounded-full cursor-pointer hover:bg-gray-400 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                className="bg-[#5b3011]/80 text-white w-28 h-10 rounded-full cursor-pointer hover:bg-[#5b3011]/40 transition-colors duration-300"
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
          className="material-icons cursor-pointer hover:text-red-500 transition-colors duration-300"
          onClick={() => onExcluir(id_usuario)}
          title="Excluir"
        >
          delete
        </span>
      </div>
    </div>
  );
}

function Professores() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [carregandoHistorico, setCarregandoHistorico] = useState(false);

  useEffect(() => {
    async function carregarProfessores() {
      try {
        const resposta = await fetch("http://localhost:3333/listarUsuarios");
        if (!resposta.ok) throw new Error("Erro ao buscar professores");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error("Erro ao carregar professores:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarProfessores();
  }, []);

  const handleExcluirUsuario = async (id_usuario) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este professor?");
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
      console.error("Erro ao excluir professor:", erro);
      alert("Erro ao excluir professor.");
    }
  };

  const handleAtualizarUsuario = (usuarioAtualizado) => {
    setUsuarios((prev) =>
      prev.map((user) =>
        user.id_usuario === usuarioAtualizado.id_usuario ? usuarioAtualizado : user
      )
    );
  };

  async function buscarHistoricoUsuario(id_usuario) {
    setCarregandoHistorico(true);
    try {
      const res = await fetch(`http://localhost:3333/historicoEmprestimos/${id_usuario}`);
      if (!res.ok) throw new Error("Erro ao buscar histórico");
      const dados = await res.json();
      setHistorico(dados);
      setUsuarioSelecionado(usuarios.find(u => u.id_usuario === id_usuario));
    } catch (e) {
      alert("Erro ao carregar histórico");
    } finally {
      setCarregandoHistorico(false);
    }
  }

  const usuariosFiltrados = usuarios.filter((user) => {
    if (user.tipo !== "professor") return false;

    const termo = busca.toLowerCase();

    return (
      user.nome.toLowerCase().includes(termo) ||
      user.registro_academico.toLowerCase().includes(termo) ||
      (user.email && user.email.toLowerCase().includes(termo)) ||
      (user.telefone && user.telefone.toLowerCase().includes(termo))
    );
  });

  return (
    <div className="flex flex-1 w-full min-h-screen font-poppins bg-[#f0e7c2]">
      <div className="w-full px-10 flex flex-col items-center">
        <form
          className="flex w-full justify-center gap-4 mt-12 mb-14"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="bg-[#5b3011]/48 rounded-full w-[74%] h-12 text-white placeholder:text-[#5b3011]/44 px-3"
            type="text"
            placeholder="O que você procura?"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer"
          >
            <span className="material-icons">search</span>
          </button>
          <Link
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 font-poppins px-3 cursor-pointer flex items-center"
            to="/cadastraProf"
          >
            <i className="material-icons mr-3">add</i>
            <span className="text-center">Cadastrar</span>
          </Link>
        </form>

        <div className="flex flex-col w-full rounded-md mt-10 mb-5">
          <div className="flex justify-center gap-5 flex-wrap w-full">
            {
              carregando ? (
                <p className="text-center w-full text-gray-600 mt-8" > Carregando professores...</p>
              ) : usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((user) => (
                  <CardUsuario
                    key={user.id_usuario}
                    id_usuario={user.id_usuario}
                    registro_academico={user.registro_academico}
                    nome={user.nome}
                    data_nascimento={user.data_nascimento}
                    email={user.email}
                    telefone={user.telefone}
                    is_ativo={user.is_ativo}
                    tipo={user.tipo}
                    cursos={user.cursos || []}
                    onExcluir={handleExcluirUsuario}
                    onAtualizar={handleAtualizarUsuario}
                    onVerHistorico={buscarHistoricoUsuario}
                  />
                ))
              ) : (
                <p className="text-center w-full text-gray-600 mt-8">Nenhum professor encontrado.</p>
              )}
          </div>
        </div>

        {usuarioSelecionado && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-[60vw] min-h-[20vh] max-h-[80vh] overflow-auto items-center">
              <button
                onClick={() => setUsuarioSelecionado(null)}
                className="mb-4 text-[#5b3011] font-bold hover:underline"
              >
                ← Fechar histórico
              </button>
              <h2 className="text-xl font-bold mb-8 text-center">Histórico de {usuarioSelecionado.nome}</h2>

              {carregandoHistorico ? (
                <p>Carregando...</p>
              ) : historico.length === 0 ? (
                <p>Não há empréstimos para este usuário.</p>
              ) : (
                <div className="overflow-x-auto w-screen max-w-full">
                  <table className="min-w-[800px] w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b p-2 min-w-[200px]">Livro</th>
                        <th className="border-b p-2 min-w-[150px]">Data Empréstimo</th>
                        <th className="border-b p-2 min-w-[150px]">Data Entrega</th>
                        <th className="border-b p-2 min-w-[200px]">Multa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historico.map((item, index) => (
                        <tr key={index}>
                          <td className="border-b p-2">{item.titulo}</td>
                          <td className="border-b p-2">{new Date(item.data_emprestimo).toLocaleDateString("pt-BR")}</td>
                          <td className="border-b p-2">{item.data_entrega ? new Date(item.data_entrega).toLocaleDateString("pt-BR") : "Não devolvido"}</td>
                          <td className="border-b p-2">{item.multa ? `R$${item.multa.toFixed(2)}` : "Sem multa"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Professores;
