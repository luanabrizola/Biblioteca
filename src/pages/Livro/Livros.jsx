import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardLivro({
  id_livro,
  titulo,
  qtde_disponivel,
  isbn,
  edicao,
  caminho_foto_capa,
  is_ativo,
  onExcluir,
  onAtualizar,
}) {
  const [verMais, setVerMais] = useState(false);
  const [editar, setEditar] = useState(false);

  const [form, setForm] = useState({
    titulo,
    qtde_disponivel,
    isbn,
    edicao,
    caminho_foto_capa,
    is_ativo,
  });

  const handleClose = () => setVerMais(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSalvar() {
    try {
      const resposta = await fetch("http://localhost:3333/atualizarLivro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_livro, ...form }),
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar livro");

      const dados = await resposta.json();
      onAtualizar(dados.livro);
      setEditar(false);
      setVerMais(false);
    } catch (erro) {
      alert("Erro ao atualizar livro");
      console.error(erro);
    }
  }

  return (
    <div className="flex flex-col bg-white w-[33%] h-auto mb-5 rounded-md p-4">
      <h1 className="text-xl font-bold mb-2 text-center break-words">{titulo}</h1>
      <p><span className="font-bold">ISBN:</span> {isbn}</p>
      <p className="mb-2"><span className="font-bold">Edição:</span> {edicao}</p>

      {verMais && !editar && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[35%] flex">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-2xl font-bold mb-8 text-center">{titulo}</h1>
              <div className="flex flex-col">
                <p className="mb-2"><span className="font-bold">Quantidade:</span> {qtde_disponivel}</p>
                <p className="mb-2"><span className="font-bold">ISBN:</span> {isbn}</p>
                <p className="mb-2"><span className="font-bold">Edição:</span> {edicao}</p>
                <p className="mb-2"><span className="font-bold">Capa:</span> {caminho_foto_capa}</p>
              </div>
              <div className="flex mt-5 w-full justify-end">
                <button
                  onClick={handleClose}
                  className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2 hover:bg-[#5b3011]/80"
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
            <h2 className="text-xl font-bold mb-4 text-center">Editar Livro</h2>
            <input type="text" name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" className="border p-2 rounded" />
            <input type="number" name="qtde_disponivel" value={form.qtde_disponivel} onChange={handleChange} placeholder="Quantidade Disponível" className="border p-2 rounded" />
            <input type="text" name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" className="border p-2 rounded" />
            <input type="text" name="edicao" value={form.edicao} onChange={handleChange} placeholder="Edição" className="border p-2 rounded" />
            <input type="text" name="caminho_foto_capa" value={form.caminho_foto_capa} onChange={handleChange} placeholder="Caminho da Capa" className="border p-2 rounded" />
            <div className="flex justify-end gap-3 mt-3">
              <button onClick={() => setEditar(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
              <button onClick={handleSalvar} className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setVerMais(!verMais)}
        className="text-black underline font-bold mt-2 hover:text-[#5b3011]"
      >
        {verMais ? "Ver menos" : "Ver mais"}
      </button>

      <div className="flex space-x-3 mt-2">
        <span
          className="material-icons cursor-pointer hover:text-gray-500"
          onClick={() => {
            setEditar(true);
            setVerMais(false);
          }}
          title="Editar"
        >
          edit
        </span>
        <span
          className="material-icons cursor-pointer hover:text-red-500"
          onClick={() => onExcluir(id_livro)}
          title="Excluir"
        >
          delete
        </span>
      </div>
    </div>
  );
}

function Livros() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resposta = await fetch("http://localhost:3333/listarLivros");
        if (!resposta.ok) throw new Error("Erro ao buscar livros");
        const dados = await resposta.json();

        console.log("Dados recebidos da API:", dados);

        setLivros(dados);
      } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
      }
    }

    carregarLivros();
  }, []);

  const handleExcluirLivro = async (id_livro) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmar) return;

    try {
      const resposta = await fetch("http://localhost:3333/removerLivro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_livro }),
      });

      const json = await resposta.json();
      console.log("Livro excluído:", json);

      setLivros((prev) => prev.filter((livro) => livro.id_livro !== id_livro));
    } catch (erro) {
      console.error("Erro ao excluir livro:", erro);
      alert("Erro ao excluir livro.");
    }
  };

  const handleAtualizarLivro = (livroAtualizado) => {
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id_livro === livroAtualizado.id_livro ? livroAtualizado : livro
      )
    );
  };

  const livrosFiltrados = livros;

  return (
    <div className="flex flex-1 min-h-screen font-poppins bg-[#f0e7c2]">
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
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-12 flex items-center justify-center"
          >
            <span className="material-icons">search</span>
          </button>
          <Link
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 px-3 flex items-center"
            to="/cadastralivro"
          >
            <i className="material-icons mr-3">add</i>
            <span className="text-center">Cadastrar</span>
          </Link>
        </form>

        <div className="flex gap-4 mb-4 font-semibold">
          <button>Título</button>
          <button>ISBN</button>
          <button>Edição</button>
          <button>Quantidade</button>
        </div>

        <div className="flex flex-col w-[90%] rounded-md mt-10 mb-5">
          <div className="flex justify-center gap-5 flex-wrap">
            {livrosFiltrados.length > 0 ? (
              livrosFiltrados.map((livro) => (
                <CardLivro
                  key={livro.id_livro}
                  {...livro}
                  onExcluir={handleExcluirLivro}
                  onAtualizar={handleAtualizarLivro}
                />
              ))
            ) : (
              <p className="text-center w-full text-gray-600 mt-8">Nenhum livro encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Livros;
