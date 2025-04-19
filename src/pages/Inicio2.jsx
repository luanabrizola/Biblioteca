import { useState } from "react";
import { Link } from "react-router-dom"

function CardLivro({ imagem, titulo, autor, edicao, editora, categoria, subcategoria, isbn, quantidade }) {
    const [verMais, setVerMais] = useState(false)

    const handleClose = () => {
        setVerMais(false)
    }

    return (
        <div className="flex bg-white w-[30%] h-auto mb-5 rounded-md relative">
            <img src={imagem} className="w-45 h-70 flex self-center ml-4 mt-4 mb-4" />
            <div className="ml-5 mt-4 w-full h-full overflow-hidden pb-10">
                <h1 className="text-xl font-bold mb-2 mr-2 text-center break-words">{titulo}</h1>
                <p>Autores: {autor}</p>
                <p>Edição: {edicao}</p>
                <p>Editora: {editora}</p>
                <p>Categoria: {categoria}</p>

                <button
                    onClick={() => setVerMais(true)}
                    className="text-black underline font-bold mt-2 cursor-pointer"
                >
                    Ver mais
                </button>

                <div className="flex space-x-3 mt-2">
                    <span className="material-icons cursor-pointer">edit</span>
                    <span className="material-icons cursor-pointer">delete</span>
                </div>
            </div>

            {verMais && (
                <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-[80%] sm:w-[60%] md:w-[40%] flex">
                        <img src={imagem} className="w-1/3 h-auto mr-4" />
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-4"> {titulo} </h1>
                            <p className="mb-2">Autores: {autor}</p>
                            <p className="mb-2">Edição: {edicao}</p>
                            <p className="mb-2">Editora: {editora}</p>
                            <p className="mb-2">Categoria: {categoria}</p>
                            <p className="mb-2">Subcategoria: {subcategoria}</p>
                            <p className="mb-2">ISBN: {isbn}</p>
                            <p className="mb-2">Quantidade disponível: {quantidade}</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleClose}
                                    className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2"
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

function CardUsuario({ registro_academico, nome, data_nascimento, email, telefone, id_tipo }) {
    const [verMais, setVerMais] = useState(false)

    const handleClose = () => {
        setVerMais(false)
    }

    return (
        <div className="flex flex-col bg-white w-[30%] h-auto mb-5 rounded-md p-4">
            <h1 className="text-xl font-bold mb-2 text-center break-words">{nome}</h1>
            <p>Registro Acadêmico: {registro_academico}</p>
            <p>Data de Nascimento: {data_nascimento}</p>

            {verMais && (
                <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-[80%] sm:w-[60%] md:w-[40%] flex">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-8 text-center"> {nome} </h1>
                            <p className="mb-2">Registro Acadêmico: {registro_academico}</p>
                            <p className="mb-2">Data de Nascimento: {data_nascimento}</p>
                            <p className="mb-2">Email: {email}</p>
                            <p className="mb-2">Telefone: {telefone}</p>
                            <p className="mb-2">Curso: </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleClose}
                                    className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2"
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
                className="text-black underline font-bold mt-2 cursor-pointer"
            >
                {verMais ? "Ver menos" : "Ver mais"}
            </button>

            <div className="flex space-x-3 mt-2">
                <span className="material-icons cursor-pointer">edit</span>
                <span className="material-icons cursor-pointer">delete</span>
            </div>
        </div>
    )
}

function Inicio2() {
    const usuarios = [
        { id_tipo: 1, registro_academico: "2023012345", nome: "João da Silva", data_nascimento: "2005-07-12", email: "joao.silva@email.com", telefone: "(42) 99999-8888" },
        { id_tipo: 2, registro_academico: "2023019876", nome: "Maria Oliveira", data_nascimento: "2006-03-25", email: "maria.oliveira@email.com", telefone: "(42) 98888-7777" },
        { id_tipo: 1, registro_academico: "2023014321", nome: "Carlos Pereira", data_nascimento: "2004-11-05", email: "carlos.pereira@email.com", telefone: "(42) 97777-5555" },
        { id_tipo: 2, registro_academico: "2023023412", nome: "Ana Santos", data_nascimento: "1980-02-10", email: "ana.santos@email.com", telefone: "(42) 96666-4444" },
    ]

    const [cadastrar, setCadastrar] = useState(false)

    const handleClose = () => {
        setCadastrar(false)
    }

    return (
        <div className="flex w-full min-h-screen font-poppins bg-[#f0e7c2]">
            <div className="w-full px-10 flex flex-col items-center justify-center">
                <form className="flex w-full justify-center gap-4 mt-12 flex-wrap mb-10">
                    <input
                        className="bg-[#5b3011]/48 rounded-full w-[74%] h-12 placeholder:text-[#5b3011]/44 px-3"
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
                        <div className="bg-white p-8 rounded-xl w-[80%] sm:w-[60%] md:w-[40%]">
                            <h2 className="text-2xl font-bold text-center mb-6">Cadastrar</h2>
                            <div className=" flex w-full h-full justify-center">
                                <div className="flex flex-col items-center space-y-6 justify-center">
                                    <Link className="bg-[#5b3011] w-80 h-20 rounded-xl text-white text-2xl flex items-center justify-center" to='/cadastraaluno'>Aluno</Link>
                                    <Link className="bg-[#5b3011] w-80 h-20 rounded-xl text-white text-2xl flex items-center justify-center" to='/cadastraprof'> Professor</Link>
                                    <Link className="bg-[#5b3011] w-80 h-20 rounded-xl text-white text-2xl flex items-center justify-center" to='/cadastralivro'>Livro</Link>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleClose}
                                    className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {["Livros", "Alunos", "Professores"].map((tituloSessao, index) => (
                    <div key={index} className="flex flex-col bg-[#5b3011]/48 w-[90%] rounded-md mt-10 mb-5 p-5">
                        <h1 className="text-white font-bold text-2xl mb-4">{tituloSessao}</h1>
                        <div className="flex justify-center gap-5 flex-wrap">
                            {tituloSessao === "Livros" && (
                                <>
                                    <CardLivro
                                        imagem="/img/DiarioAnneFrank.png"
                                        titulo="O Diário de Anne Frank"
                                        autor="Anne Frank"
                                        edicao="Anne 99°"
                                        editora="Record"
                                        categoria="Biografia"
                                        subcategoria="Holocausto, nazismo"
                                        isbn="8501044458"
                                        quantidade="2 unidades"
                                    />
                                    <CardLivro
                                        imagem="/img/DiarioAnneFrank.png"
                                        titulo="O Diário de Anne Frank"
                                        autor="Anne Frank"
                                        edicao="Anne 99°"
                                        editora="Record"
                                        categoria="Biografia"
                                        subcategoria="Holocausto, nazismo"
                                        isbn="8501044458"
                                        quantidade="2 unidades"
                                    />
                                    <CardLivro
                                        imagem="/img/DiarioAnneFrank.png"
                                        titulo="O Diário de Anne Frank"
                                        autor="Anne Frank"
                                        edicao="Anne 99°"
                                        editora="Record"
                                        categoria="Biografia"
                                        subcategoria="Holocausto, nazismo"
                                        isbn="8501044458"
                                        quantidade="2 unidades"
                                    />
                                </>
                            )}
                            {tituloSessao === "Alunos" && usuarios.filter(user => user.id_tipo === 1).map(user => (
                                <CardUsuario
                                    key={user.registro_academico}
                                    registro_academico={user.registro_academico}
                                    nome={user.nome}
                                    data_nascimento={user.data_nascimento}
                                    email={user.email}
                                    telefone={user.telefone}
                                    id_tipo="Aluno"
                                />
                            ))}
                            {tituloSessao === "Professores" && usuarios.filter(user => user.id_tipo === 2).map(user => (
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

export default Inicio2;
