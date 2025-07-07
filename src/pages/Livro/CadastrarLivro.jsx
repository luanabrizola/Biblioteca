import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CadastrarLivro() {
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [qtdeDisponivel, setQtdeDisponivel] = useState("");
    const [isbn, setIsbn] = useState("");
    const [edicao, setEdicao] = useState("");
    const [fotoCapa, setFotoCapa] = useState(null);

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [novaCategoria, setNovaCategoria] = useState({ nome: "" });
    const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

    const [editoras, setEditoras] = useState([]);
    const [editoraSelecionada, setEditoraSelecionada] = useState("");
    const [novaEditora, setNovaEditora] = useState({ nome: "" });
    const [mostrarNovaEditora, setMostrarNovaEditora] = useState(false);

    const [autores, setAutores] = useState([]);
    const [autorSelecionado, setAutorSelecionado] = useState("");
    const [novoAutor, setNovoAutor] = useState({ nome: "" });
    const [mostrarNovoAutor, setMostrarNovoAutor] = useState(false);

    useEffect(() => {
        buscarCategorias();
        buscarEditoras();
        buscarAutores();
    }, []);

    async function buscarCategorias() {
        try {
            const resposta = await fetch("http://localhost:3333/listarCategorias");
            const dados = await resposta.json();
            setCategorias(dados);
        } catch (erro) {
            console.error("Erro ao buscar categorias:", erro);
        }
    }

    async function buscarEditoras() {
        try {
            const resposta = await fetch("http://localhost:3333/listarEditoras");
            const dados = await resposta.json();
            setEditoras(dados);
        } catch (erro) {
            console.error("Erro ao buscar editoras:", erro);
        }
    }

    async function buscarAutores() {
        try {
            const resposta = await fetch("http://localhost:3333/listarAutores");
            const dados = await resposta.json();
            setAutores(dados);
        } catch (erro) {
            console.error("Erro ao buscar autores:", erro);
        }
    }

    const cadastrarCategoria = async () => {
        if (!novaCategoria.nome.trim()) {
            return alert("Preencha o nome da categoria");
        }
        const nomes = categorias.map(cat => (cat.nome_categoria ?? "").trim().toLowerCase());
        if (nomes.includes(novaCategoria.nome.trim().toLowerCase())) {
            return alert("Já existe uma categoria com esse nome.");
        }

        try {
            const resposta = await fetch("http://localhost:3333/cadastrarCategoria", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome_categoria: novaCategoria.nome.trim() })
            });

            if (!resposta.ok) throw new Error("Erro ao cadastrar categoria");

            await buscarCategorias();
            setNovaCategoria({ nome: "" });
            setMostrarNovaCategoria(false);
        } catch (erro) {
            console.error("Erro ao cadastrar categoria:", erro);
            alert("Erro ao cadastrar categoria.");
        }
    };

    const cadastrarEditora = async () => {
        if (!novaEditora.nome.trim()) {
            return alert("Preencha o nome da editora");
        }
        const nomes = editoras.map((ed) => (ed.nome ?? "").trim().toLowerCase());
        if (nomes.includes(novaEditora.nome.trim().toLowerCase())) {
            return alert("Já existe uma editora com esse nome.");
        }

        try {
            const resposta = await fetch("http://localhost:3333/cadastrarEditora", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaEditora),
            });

            if (!resposta.ok) throw new Error("Erro ao cadastrar editora");

            await buscarEditoras();
            setNovaEditora({ nome: "" });
            setMostrarNovaEditora(false);
        } catch (erro) {
            console.error("Erro ao cadastrar editora:", erro);
            alert("Erro ao cadastrar editora.");
        }
    };

    const cadastrarAutor = async () => {
        if (!novoAutor.nome.trim()) {
            return alert("Preencha o nome do autor");
        }
        const nomes = autores.map((aut) => (aut.nome_autor ?? "").trim().toLowerCase());
        if (nomes.includes(novoAutor.nome.trim().toLowerCase())) {
            return alert("Já existe um autor com esse nome.");
        }

        try {
            const resposta = await fetch("http://localhost:3333/cadastrarAutor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome_autor: novoAutor.nome.trim() })
            });

            if (!resposta.ok) throw new Error("Erro ao cadastrar autor");

            await buscarAutores();
            setNovoAutor({ nome: "" });
            setMostrarNovoAutor(false);
        } catch (erro) {
            console.error("Erro ao cadastrar autor:", erro);
            alert("Erro ao cadastrar autor.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !titulo.trim() ||
            !qtdeDisponivel.trim() ||
            !isbn.trim() ||
            !edicao.trim() ||
            !categoriaSelecionada ||
            !editoraSelecionada ||
            !autorSelecionado
        ) {
            return alert("Preencha todos os campos obrigatórios.");
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("qtde_disponivel", qtdeDisponivel);
        formData.append("isbn", isbn);
        formData.append("edicao", edicao);
        formData.append("is_ativo", true);
        if (fotoCapa) formData.append("imagem", fotoCapa);

        try {
            const resposta = await fetch("http://localhost:3333/cadastrarLivro", {
                method: "POST",
                body: formData,
            });

            if (!resposta.ok) {
                const errorMsg = await resposta.text();
                throw new Error(errorMsg || "Erro ao cadastrar livro");
            }

            const dados = await resposta.json();
            const id_livro = dados.id_livro.id_livro;
            const associarCategoria = await fetch("http://localhost:3333/associarCategoriaAoLivro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_livro,
                    id_categoria: parseInt(categoriaSelecionada),
                }),
            });
            if (!associarCategoria.ok)
                throw new Error("Erro ao associar categoria");

            const associarEditora = await fetch(
                "http://localhost:3333/associarEditoraAoLivro",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_livro,
                        id_editora: parseInt(editoraSelecionada),
                    }),
                }
            );
            if (!associarEditora.ok)
                throw new Error("Erro ao associar editora");

            const associarAutor = await fetch(
                "http://localhost:3333/associarAutorAoLivro",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_livro,
                        id_autor: parseInt(autorSelecionado),
                    }),
                }
            );
            if (!associarAutor.ok) throw new Error("Erro ao associar autor");

            alert("Livro cadastrado com sucesso!");
            navigate("/livros");
        } catch (erro) {
            console.error("Erro ao cadastrar:", erro.message);
            alert("Erro ao cadastrar livro.");
        }
    };

    return (
        <div className="flex w-full h-full">
            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl p-3">
                    <div className="flex items-center mt-2">
                        <img
                            src="/img/iconeLivroo.png"
                            alt="Ícone Livro"
                            className="w-18 h-18 mr-4"
                        />
                        <h1 className="border-b border-gray-300 my-4 text-4xl text-[#331a08] font-semibold">
                            Cadastrar
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col ">
                        <div className="flex gap-4">
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-3 px-5">
                                <label className="mr-2">ISBN:</label>
                                <input
                                    type="text"
                                    className="h-full w-full bg-transparent outline-none"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-3 px-5">
                                <label className="mr-2">Qtd. disp:</label>
                                <input
                                    type="number"
                                    className="h-full w-full bg-transparent outline-none"
                                    value={qtdeDisponivel}
                                    onChange={(e) => setQtdeDisponivel(e.target.value)}
                                    required
                                    min={0}
                                />
                            </div>
                        </div>

                        <div className="bg-[#9f6d3d]/19 rounded-full h-10  mt-5 flex items-center mr-3 px-5">
                            <label className="mr-2">Título:</label>
                            <input
                                type="text"
                                className="h-full w-full bg-transparent outline-none"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="bg-[#9f6d3d]/19 rounded-full h-10 mt-5 flex items-center mr-3 px-5">
                            <label className="mr-2">Edição:</label>
                            <input
                                type="text"
                                className="h-full w-full bg-transparent outline-none"
                                value={edicao}
                                onChange={(e) => setEdicao(e.target.value)}
                                required
                            />
                        </div>


                        <div className="w-full mt-5 flex items-center space-x-2">
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5">
                                <label className="mr-2">Categorias:</label>
                                <select
                                    className="h-full w-full bg-transparent outline-none"
                                    value={categoriaSelecionada}
                                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}
                                        >
                                            {categoria.nome_categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMostrarNovaCategoria(true)}
                                className="bg-[#9f6d3d]/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#9f6d3d]/48 cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        {mostrarNovaCategoria && (
                            <div className="flex gap-2 items-center mt-2 px-5">
                                <input
                                    type="text"
                                    placeholder="Nova categoria"
                                    value={novaCategoria.nome}
                                    onChange={(e) => setNovaCategoria({ nome: e.target.value })}
                                    className="border rounded px-2 py-1 flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={cadastrarCategoria}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMostrarNovaCategoria(false)}
                                    className="bg-gray-400 text-white px-4 py-1 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                        <div className="w-full mt-5 flex items-center space-x-2">

                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5">
                                <label className="mr-2">Editora:</label>
                                <select
                                    className="h-full w-full bg-transparent outline-none"
                                    value={editoraSelecionada}
                                    onChange={(e) => setEditoraSelecionada(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione uma editora</option>
                                    {editoras.map((editora) => (
                                        <option key={editora.id_editora} value={editora.id_editora}>
                                            {editora.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMostrarNovaEditora(true)}
                                className="bg-[#9f6d3d]/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#9f6d3d]/48 cursor-pointer "
                            >
                                +
                            </button>
                        </div>

                        {mostrarNovaEditora && (
                            <div className="flex gap-2 items-center mt-2 px-5">
                                <input
                                    type="text"
                                    placeholder="Nova editora"
                                    value={novaEditora.nome}
                                    onChange={(e) => setNovaEditora({ nome: e.target.value })}
                                    className="border rounded px-2 py-1 flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={cadastrarEditora}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMostrarNovaEditora(false)}
                                    className="bg-gray-400 text-white px-4 py-1 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}





                        <div className="w-full mt-5 flex items-center">

                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5">
                                <label className="mr-2">Autor:</label>
                                <select
                                    className="h-full w-full bg-transparent outline-none"
                                    value={autorSelecionado}
                                    onChange={(e) => setAutorSelecionado(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um autor</option>
                                    {autores.map((autor) => (
                                        <option key={autor.id_autor} value={autor.id_autor}>
                                            {autor.nome_autor}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMostrarNovoAutor(true)}
                                className="bg-[#9f6d3d]/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#9f6d3d]/48 cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        {mostrarNovoAutor && (
                            <div className="flex gap-2 items-center mt-2 px-5">
                                <input
                                    type="text"
                                    placeholder="Novo autor"
                                    value={novoAutor.nome}
                                    onChange={(e) => setNovoAutor({ nome: e.target.value })}
                                    className="border rounded px-2 py-1 flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={cadastrarAutor}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMostrarNovoAutor(false)}
                                    className="bg-gray-400 text-white px-4 py-1 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}

                        <div className="bg-[#9f6d3d]/19 rounded-full h-10 mt-5 flex items-center mr-3 px-5">
                            <label className="mr-2 ">Foto da capa:</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="h-full w-full bg-transparent outline-none"
                                onChange={(e) => setFotoCapa(e.target.files[0])}
                            />
                        </div>

                        <div className="flex justify-center gap-6 mt-8">
                            <Link
                                className="bg-gray-600 w-28 h-12 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition"
                                to="/livros"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                className="bg-[#5b3011] w-28 h-12 rounded-full flex items-center justify-center text-white hover:bg-[#3e1e00] transition"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastrarLivro;
