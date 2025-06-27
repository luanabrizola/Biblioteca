import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CadastrarEmprestimo() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);

  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState("");
  const [data, setData] = useState("");
  const [devolucao, setDevolucao] = useState("");

  useEffect(() => {
    async function carregarUsuariosELivros() {
      try {
        const respUsuarios = await fetch("http://localhost:3333/listarUsuarios");
        const usuariosData = await respUsuarios.json();
        setUsuarios(usuariosData);

        const respLivros = await fetch("http://localhost:3333/listarLivros");
        const livrosData = await respLivros.json();
        setLivros(livrosData);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
      }
    }

    carregarUsuariosELivros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSelecionado || !data || !livroSelecionado || !devolucao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3333/cadastrarEmprestimo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: usuarioSelecionado,
          id_livro: livroSelecionado,
          data_emprestimo: data,
          data_devolucao: devolucao,
          is_ativo: true,
        }),
      });

      if (!resposta.ok) {
        const texto = await resposta.text();
        console.error("Erro na resposta da API:", texto);
        alert("Erro ao cadastrar empréstimo.");
        return;
      }

      alert("Empréstimo cadastrado com sucesso!");
      navigate("/emprestimos");
    } catch (erro) {
      console.error("Erro ao cadastrar empréstimo:", erro);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl p-3">
          <h1 className="border-b border-gray-300 my-4 text-5xl text-[#331a08] font-semibold">Empréstimo</h1>
          <div className="w-full px-16">
            <form onSubmit={handleSubmit}>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full mt-5 flex items-center px-5">
                <label className="mr-2">Registro acadêmico:</label>
                <select
                  className="h-full w-full bg-transparent outline-none"
                  value={usuarioSelecionado}
                  onChange={(e) => setUsuarioSelecionado(e.target.value)}
                  required
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id_usuario} value={usuario.id_usuario}>
                      {usuario.registro_academico} - {usuario.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                <label htmlFor="data">Data:</label>
                <input
                  type="date"
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="h-full w-full bg-transparent outline-none"
                  required
                />
              </div>

              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full mt-5 flex items-center px-5">
                <label className="mr-2">ISBN:</label>
                <select
                  className="h-full w-full bg-transparent outline-none"
                  value={livroSelecionado}
                  onChange={(e) => setLivroSelecionado(e.target.value)}
                  required
                >
                  <option value="">Selecione um livro</option>
                  {livros.map((livro) => (
                    <option key={livro.id_livro} value={livro.id_livro}>
                      {livro.isbn} - {livro.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                <label htmlFor="devolucao">Devolução:</label>
                <input
                  type="date"
                  id="devolucao"
                  value={devolucao}
                  onChange={(e) => setDevolucao(e.target.value)}
                  className="h-full w-full bg-transparent outline-none"
                  required
                />
              </div>

              <div className="flex mb-5 mt-5">
                <Link
                  className="bg-[#848484] w-28 h-10 rounded-full mr-5 flex items-center justify-center"
                  to="/emprestimos"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="bg-[#848484] w-28 h-10 rounded-full flex items-center justify-center"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastrarEmprestimo;
