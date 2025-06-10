import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function CardUsuario({ registro_academico, nome, data_nascimento, email, telefone }) {
    const [verMais, setVerMais] = useState(false)

    const handleClose = () => {
        setVerMais(false)
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


function Alunos() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        async function carregarAlunos() {
            try {
                const resposta = await fetch("http://localhost:3333/listarUsuarios")
                if (!resposta.ok) throw new Error("Erro ao buscar alunos")
                const dados = await resposta.json()
                setUsuarios(dados);
            } catch (erro) {
                console.error("Erro ao carregar alunos:", erro)
            }
        }

        carregarAlunos()
    }, [])

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
                    <Link className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 font-poppins px-3 cursor-pointer flex items-center" to='/cadastraaluno'>
                        <i className="material-icons mr-3">add</i>
                        <span className="text-center">Cadastrar</span>
                    </Link>
                </form>

                <div>
                    <button>Nome</button>
                    <button>Curso</button>
                    <button>Data de Nascimento</button>
                    <button>Email</button>
                    <button></button>
                </div>

                {["Alunos"].map((tituloSessao, index) => (
                    <div key={index} className="flex flex-col w-[90%] rounded-md mt-10 mb-5">
                        <div className="flex justify-center gap-5 flex-wrap">
                            {tituloSessao === "Alunos" &&
                                usuarios
                                    .filter(user => user.tipo === "aluno")
                                    .map(user => (
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Alunos;

