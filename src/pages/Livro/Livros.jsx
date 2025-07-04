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
  autores = [],
  categorias = [],
  editora,
  onExcluir,
  onAtualizar,
}) {

  const [form, setForm] = useState({
    titulo,
    qtde_disponivel,
    isbn,
    edicao,
    caminho_foto_capa,
    is_ativo,
  });

  const [verMais, setVerMais] = useState(false);
  const [editar, setEditar] = useState(false);

  const [fotoCapa, setFotoCapa] = useState(null);

  const handleClose = () => setVerMais(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSalvar() {
    try {
      const formData = new FormData();
      formData.append("id_livro", id_livro);
      formData.append("titulo", form.titulo);
      formData.append("qtde_disponivel", form.qtde_disponivel);
      formData.append("isbn", form.isbn);
      formData.append("edicao", form.edicao);
      formData.append("is_ativo", true);
      if (fotoCapa) {
        formData.append("imagem", fotoCapa);
      }

      const resposta = await fetch("http://localhost:3333/atualizarLivro", {
        method: "PUT",
        body: formData,
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
    <div className="flex flex-col bg-white w-[45%] h-auto mb-5 rounded-md p-4">
      <div className="flex">
        <img src={`http://localhost:3333/imagens/${id_livro}.${caminho_foto_capa}`} alt="Capa do Livro" className="w-[200px] h-[300px]" />
        <div className="ml-5 h-[90%] mt-4 flex flex-col">
          <h1 className="text-xl font-bold mb-2 text-center break-words">{titulo}</h1>
          <p className="mb-2"><span className="font-bold">ISBN:</span> {isbn}</p>
          <p className="mb-2"><span className="font-bold">Edição:</span> {edicao}</p>
          <p><span className="font-bold">Quantidade Disponível:</span> {qtde_disponivel}</p> <br />

          <div className="flex flex-col justify-end h-full">
            <button
              onClick={() => setVerMais(!verMais)}
              className="text-black underline font-bold flex justify-center mt-2 hover:text-[#5b3011]"
            >
              {verMais ? "Ver menos" : "Ver mais"}
            </button>

            <div className="flex justify-end space-x-3">
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

        </div>
      </div>

      {verMais && !editar && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-col z-50">
          <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[55%] flex overflow-auto max-h-[80vh]">
            <img src={`http://localhost:3333/imagens/${id_livro}.${caminho_foto_capa}`} alt="Capa do Livro" />
            <div className="ml-5 h-[90%] mt-4 flex flex-col">
              <h1 className="text-2xl font-bold mb-4 text-center">{titulo}</h1> <br />

              <p><span className="font-bold">Quantidade Disponível:</span> {qtde_disponivel}</p> <br />

              <p><span className="font-bold">ISBN:</span> {isbn}</p> <br />

              <p><span className="font-bold">Edição:</span> {edicao}</p>


              <div className="mt-4">
                <h3 className="font-semibold">Autores:</h3>
                {autores.length > 0 ? (
                  autores.map((autor) => (
                    <p key={autor.id_autor}>{autor.nome_autor}</p>
                  ))
                ) : (
                  <p>Sem autores cadastrados</p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Categorias:</h3>
                {categorias.length > 0 ? (
                  categorias.map((categoria) => (
                    <p key={categoria.id_categoria}>{categoria.nome_categoria}</p>
                  ))
                ) : (
                  <p>Sem categorias cadastradas</p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Editora:</h3>
                {editora ? (
                  <p>{editora.nome}</p>
                ) : (
                  <p>Sem editora cadastrada</p>
                )}
              </div>

              <div className="flex mt-5 w-full justify-end self-end items-end">
                <button
                  onClick={handleClose}
                  className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2 hover:bg-[#5b3011]/80 self-end"
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
              <img src="/img/iconeLivroo.png" alt="" className="w-18 h-18 mr-4" />
              <h1 className="border-b border-gray-300 my-4 text-4xl text-[#331a08] font-semibold">Editar</h1>
            </div>
            <div className="w-full px-16 mt-2">
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Título:</label>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Quantidade Disponível:</label>
                <input
                  type="number"
                  name="qtde_disponivel"
                  value={form.qtde_disponivel}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">ISBN:</label>
                <input
                  type="text"
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Edição:</label>
                <input
                  type="text"
                  name="edicao"
                  value={form.edicao}
                  onChange={handleChange}
                  className="h-full w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5 mb-2">
                <label className="mr-2">Foto de Capa:</label>
                <input
                  type="file"
                  name="caminho_foto_capa"
                  onChange={(e) => setFotoCapa(e.target.files[0])}
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
    </div>
  );
}

function Livros() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [tipoBusca, setTipoBusca] = useState("titulo");
  const [buscaFinal, setBuscaFinal] = useState("");

  useEffect(() => {
    if (busca.trim() === "") {
      setBuscaFinal("");
    }
  }, [busca]);

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resposta = await fetch("http://localhost:3333/livrosCompletos");
        if (!resposta.ok) throw new Error("Erro ao buscar livros");
        const dados = await resposta.json();

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
    if (!livroAtualizado || !livroAtualizado.id_livro) {
      console.warn("Livro atualizado inválido:", livroAtualizado);
      return;
    }
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id_livro === livroAtualizado.id_livro ? livroAtualizado : livro
      )
    );
  };

  const removerAcentos = (texto) => {
    // texto.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const livrosFiltrados = livros.filter((livro) => {
    const buscaLower = removerAcentos(buscaFinal.toLowerCase());

    switch (tipoBusca) {
      case "titulo":
        return removerAcentos(livro.titulo).includes(buscaLower);

      case "autor":
        return livro.autores?.some((autor) =>
          removerAcentos(autor.nome_autor).includes(buscaLower)
        );

      case "categoria":
        return livro.categorias?.some((categoria) =>
          removerAcentos(categoria.nome_categoria).includes(buscaLower)
        );

      default:
        return false;
    }

  });

  console.log('livros:', livros);
  console.log('livrosFiltrados:', livrosFiltrados);
  return (
    <div className="flex flex-1 min-h-screen font-poppins bg-[#f0e7c2]">
      <div className="w-full px-10 flex flex-col items-center">
        <form
          className="flex w-full justify-center gap-4 mt-12 mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            setBuscaFinal(busca);
          }}
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
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 px-3 flex items-center"
            to="/cadastralivro"
          >
            <i className="material-icons mr-3">add</i>
            <span className="text-center">Cadastrar</span>
          </Link>
        </form>

        <div className="flex gap-4 mb-4 font-semibold">
          <button
            onClick={() => setTipoBusca("titulo")}
            className={`w-30 py-2 rounded-full border-none ${tipoBusca === "titulo" ? "bg-[#5b3011]/60 text-white" : "bg-white text-black"
              }`}
          >
            Título
          </button>
          <button
            onClick={() => setTipoBusca("autor")}
            className={`w-30 py-2 rounded-full border-none ${tipoBusca === "autor" ? "bg-[#5b3011]/60 text-white" : "bg-white text-black"
              }`}
          >
            Autor
          </button>
          <button
            onClick={() => setTipoBusca("categoria")}
            className={`w-30 py-2 rounded-full border-none ${tipoBusca === "categoria" ? "bg-[#5b3011]/60 text-white" : "bg-white text-black"
              }`}
          >
            Categoria
          </button>
        </div>

        <div className="flex flex-col w-[100%] rounded-md mt-10 mb-5">
          <div className="flex justify-center gap-5 flex-wrap">
            {livrosFiltrados.length > 0 ? (
              livrosFiltrados.map((livro) => (
                <CardLivro
                  key={livro.id_livro}
                  {...livro}
                  onExcluir={handleExcluirLivro}
                  onAtualizar={handleAtualizarLivro}
                  categorias={livro.categorias || []}
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
