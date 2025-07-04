import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

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
            console.log("Resposta da API ao salvar:", dados)
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
                <img src={`http://localhost:3333/imagens/${id_livro}.${caminho_foto_capa}`} alt="Capa do Livro" className="max-h-[300px] h-auto w-auto max-w-[250px]" />
                <div className="ml-5 h-[90%] mt-4 flex flex-col">
                    <h1 className="text-xl font-bold mb-2 text-center break-words">{titulo}</h1>
                    <p><span className="font-bold">ISBN:</span> {isbn}</p>
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
        </div>
    )
}

function CardUsuario({ registro_academico, nome, data_nascimento, email, telefone, id_tipo }) {
    const [verMais, setVerMais] = useState(false)

    const handleClose = () => {
        setVerMais(false)
    }

    return (
        <div className="flex flex-col bg-white w-[30%] h-auto mb-5 rounded-md p-4">
            <h1 className="text-xl font-bold mb-2 text-center break-words">{nome}</h1>
            <p>
                <span className="font-bold">Registro Acadêmico</span> {registro_academico}
            </p>
            <p className="mb-2">
                <span className="font-bold">Curso:</span>
            </p>

            {verMais && (
                <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[35%] flex">
                        <div className="flex flex-col items-center w-full">
                            <h1 className="text-2xl font-bold mb-8 text-center"> {nome} </h1>
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

            <button
                onClick={() => setVerMais(!verMais)}
                className="text-black underline font-bold mt-2 cursor-pointer hover:text-[#5b3011] transition-colors duration-300"
            >
                {verMais ? "Ver menos" : "Ver mais"}
            </button>

            <div className="flex space-x-3 mt-2">
                <span className="material-icons cursor-pointer hover:text-gray-500 transition-colors duration-300">edit</span>
                <span className="material-icons cursor-pointer hover:text-red-500 transition-colors duration-300">delete</span>
            </div>
        </div>
    )
}

function Inicio() {
    const [usuarios, setUsuarios] = useState([])

    const [cadastrar, setCadastrar] = useState(false)

    const handleClose = () => {
        setCadastrar(false)
    }

    useEffect(() => {
        fetch("http://localhost:3333/listarUsuarios")
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error("Erro ao buscar usuários:", error))
    }, [])

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

    return (
        <div className="flex w-full flex-1 font-poppins bg-[#f0e7c2]">
            <div className="w-full px-10 flex flex-col items-center justify-center">
                <form className="flex w-full justify-center gap-4 mt-12 flex-wrap mb-10">
                    <input
                        className="bg-[#5b3011]/48 rounded-full w-[74%] h-12 text-white placeholder:text-[#5b3011]/44 px-3"
                        type="text"
                        placeholder="O que você procura?"
                    />
                    <button className="bg-[#5b3011]/48 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer">
                        <span className="material-icons">search</span>
                    </button>
                    <button
                        className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 font-poppins px-3 cursor-pointer flex items-center"
                        onClick={() => setCadastrar(true)}
                        type="button"
                    >
                        <span className="material-icons mr-3">add</span>
                        Cadastrar
                    </button>
                </form>

                {cadastrar && (
                    <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-xl sm:w-[60%] md:w-[40%]">
                            <h2 className="text-4xl font-bold text-center mb-10 text-[#331a08]">Cadastrar</h2>
                            <div className=" flex w-full h-full justify-center">
                                <div className="flex flex-col items-center space-y-4 justify-center">
                                    <Link className="bg-[#5b3011] w-80 h-20 rounded-full text-white text-lg flex items-center justify-center relative transition-all duration-200 transform hover:scale-110" to='/cadastraaluno'>
                                        <i className="ph ph-student text-4xl absolute left-8"></i>
                                        <span className="text-center">Aluno</span>
                                    </Link>
                                    <Link className="bg-[#5b3011] w-80 h-20 rounded-full text-white text-lg flex items-center justify-center relative transition-all duration-200 transform hover:scale-110" to='/cadastraprof'>
                                        <i className="ph ph-chalkboard-teacher text-4xl absolute left-8"></i>
                                        <span className="text-center">Professor</span>
                                    </Link>
                                    <Link className="bg-[#5b3011] w-80 h-20 rounded-full text-white text-lg flex items-center justify-center p-6 relative transition-all duration-200 transform hover:scale-110" to='/cadastralivro'>
                                        <i className="ph ph-book-open text-4xl absolute left-8"></i>
                                        <span className="text-center">Livro</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleClose}
                                    className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2 mt-5 cursor-pointer hover:bg-[#5b3011]/80 transition-colors duration-300"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {["Livros", "Alunos", "Professores"].map((tituloSessao, index) => (
                    <div key={index} className="flex flex-col bg-[#5b3011]/48 w-[90%] rounded-md mt-10 mb-5 p-5">
                        <Link to={`/${tituloSessao.toLowerCase()}`} className="text-white font-bold text-2xl mb-4 transition-all duration-200 hover:text-4xl cursor-pointer">
                            {tituloSessao}
                        </Link>
                        <div className="flex justify-center gap-5 flex-wrap">
                            {tituloSessao === "Livros" && (
                                <div className="flex flex-col w-[90%] rounded-md mt-10 mb-5">
                                    <div className="flex justify-center gap-5 flex-wrap">
                                        {livrosFiltrados.length > 0 ? (
                                            livrosFiltrados.slice(0, 2)
                                                .map((livro) => (
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
                            )}
                            {tituloSessao === "Alunos" && usuarios.filter(user => user.tipo === "aluno")
                                .slice(0, 3)
                                .map(user => (
                                    <CardUsuario
                                        key={user.id_usuario}
                                        registro_academico={user.registro_academico}
                                        nome={user.nome}
                                        data_nascimento={user.data_nascimento}
                                        email={user.email}
                                        telefone={user.telefone}
                                        tipo="aluno"
                                    />
                                ))}
                            {tituloSessao === "Professores" && usuarios.filter(user => user.tipo === "professor")
                                .slice(0, 3)
                                .map(user => (
                                    <CardUsuario
                                        key={user.registro_academico}
                                        registro_academico={user.registro_academico}
                                        nome={user.nome}
                                        data_nascimento={user.data_nascimento}
                                        email={user.email}
                                        telefone={user.telefone}
                                        id_tipo="Professor"
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Inicio;
