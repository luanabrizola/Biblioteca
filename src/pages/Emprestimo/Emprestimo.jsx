import { useState } from "react";
import { Link } from "react-router-dom"

function CardEmprestimo({ imagem, titulo, autor, edicao, editora, categoria, subcategoria, isbn, quantidade }) {
    const [verMais, setVerMais] = useState(false)

    const handleClose = () => {
        setVerMais(false)
    }

    return (
        <div className="flex bg-white w-[30%] h-auto mb-5 rounded-md relative">
            <img src={imagem} className="w-45 h-70 flex self-center ml-4 mt-4 mb-4" />
            <div className="ml-5 mt-4 w-full h-full overflow-hidden pb-10">
                <h1 className="text-xl font-bold mb-2 mr-2 text-center break-words">{titulo}</h1>
                <p className="mb-2">
                    <span className="font-bold">Autores:</span> {autor}
                </p>
                <p className="mb-2">
                    <span className="font-bold">Edição:</span> {edicao}
                </p>
                <p className="mb-2">
                    <span className="font-bold">Editora:</span> {editora}
                </p>
                <p className="mb-2">
                    <span className="font-bold">Categoria:</span> {categoria}
                </p>

                <button
                    onClick={() => setVerMais(true)}
                    className="text-black underline font-bold mt-2 cursor-pointer hover:text-[#5b3011] transition-colors duration-300"
                >
                    Ver mais
                </button>

                <div className="flex space-x-3 mt-2">
                    <i className="material-icons cursor-pointer hover:text-gray-500 transition-colors duration-300">edit</i>
                    <i className="material-icons cursor-pointer hover:text-red-500 transition-colors duration-300">delete</i>
                </div>
            </div>

            {verMais && (
                <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md sm:w-[60%] md:w-[40%] flex">
                        <img src={imagem} className="w-1/3 h-auto mr-7" />
                        <div className="flex flex-col w-full">
                            <h1 className="text-2xl font-bold mb-4"> {titulo} </h1>
                            <p className="mb-2">
                                <span className="font-bold">Autores:</span> {autor}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Edição:</span> {edicao}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Editora:</span> {editora}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Categoria:</span> {categoria}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Subcategoria:</span> {subcategoria}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">ISBN:</span> {isbn}
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Quantidade:</span> {quantidade}
                            </p>
                            <div className="flex justify-end mt-5 w-full h-full items-end">
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
        </div>
    )
}


function Emprestimo() {

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
                    <Link className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 font-poppins px-3 cursor-pointer flex items-center" to='/cadastralivro'>
                        <i className="material-icons mr-3">add</i>
                        <span className="text-center">Cadastrar</span>
                    </Link>
                </form>

                <div>

                    <button>Título</button>
                    <button>Autor</button>
                    <button>Editora</button>
                    <button>Categoria</button>
                    <button>Subcategoria</button>
                </div>

                {["Livros"].map((tituloSessao, index) => (
                    <div key={index} className="flex flex-col w-[90%] rounded-md mt-10 mb-5">
                        <div className="flex justify-center gap-5 flex-wrap">
                            {tituloSessao === "Livros" && (
                                <>
                                    <CardEmprestimo
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
                                    <CardEmprestimo
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
                                    <CardEmprestimo
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Emprestimo;
