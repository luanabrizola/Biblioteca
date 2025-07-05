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

    return (
        <div className="flex bg-white w-[45%] h-[380px] mb-5 rounded-md p-4">
            <img src={`http://localhost:3333/imagens/${id_livro}.${caminho_foto_capa}`} alt="Capa do Livro" className="max-h-[350px] h-auto w-auto max-w-[300px]" />
            <div className="ml-5 h-[90%] mt-4 flex flex-col">
                <h1 className="text-xl font-bold mb-2 text-center break-words">{titulo}</h1>
                <p className="mb-2"><span className="font-bold">ISBN:</span> {isbn}</p>
                <p className="mb-2"><span className="font-bold">Edição:</span> {edicao}</p>
                <p><span className="font-bold">Quantidade Disponível:</span> {qtde_disponivel}</p> <br />
            </div>

            {verMais && (
                <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-col z-50">
                    <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[55%] flex  overflow-auto max-h-[80vh]">
                        <img src={`http://localhost:3333/imagens/${id_livro}.${caminho_foto_capa}`} alt="Capa do Livro" />
                        <div className="ml-5 h-[90%] mt-4 flex flex-col">
                            <h1 className="text-2xl font-bold mb-4 text-center">{titulo}</h1> <br />

                            <p className="mb-2"><span className="font-bold">Quantidade Disponível:</span> {qtde_disponivel}</p>

                            <p className="mb-2"><span className="font-bold">ISBN:</span> {isbn}</p>

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
        </div>
    )
}



function Consulta() {

    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarLivros() {
            try {
                const resposta = await fetch("http://localhost:3333/livrosCompletos");
                if (!resposta.ok) throw new Error("Erro ao buscar livros");
                const dados = await resposta.json();

                setLivros(dados);
            } catch (erro) {
                console.error("Erro ao carregar livros:", erro);
            } finally {
                setCarregando(false)
            }
        }

        carregarLivros();
    }, [])

    const livrosFiltrados = livros.filter((livro) =>
        livro.titulo.toLowerCase().includes(busca.toLowerCase())
    );

    return (

        <div className='flex w-full min-h-screen font-poppins'>

            <div className='bg-[#f0e7c2] flex flex-1 flex-col w-full font-poppins items-center'>
                <div className="mb-20 w-full px-10 flex flex-col">
                    <form action="get"
                        className="flex w-full justify-center gap-4 mt-12 flex-wrap"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            className="bg-[#5b3011]/48 rounded-full w-[74%] h-12 placeholder:text-[#5b3011]/44 px-3"
                            type="text"
                            placeholder="Pesquise por um livro"
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <select name="select" id="0" className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 font-poppins px-3 cursor-pointer">
                            <option value="0">Busca livre</option>
                            <option value="1">Título</option>
                            <option value="2">Autor</option>
                            <option value="3">Editora</option>
                            <option value="4">Categoria</option>
                            <option value="5">Subcategoria</option>
                        </select>
                        <button className="bg-[#5b3011]/48 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer">
                            <span className="material-icons">search</span>
                        </button>
                    </form>
                </div>
                <div className="flex flex-col w-[90%] rounded-md mt-10 mb-5">
                    <div className="flex justify-center gap-5 flex-wrap ">
                        {
                            carregando ? (
                                <p className="text-center w-full text-gray-600 mt-8" > Carregando livros...</p>
                            ) : livros.length > 0 ? (
                                livros.map((livro) => (
                                    <CardLivro key={livro.id_livro} {...livro} />
                                ))
                            ) : (
                                <p className="text-center w-full text-gray-600 mt-8">Nenhum livro encontrado.</p>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Consulta
