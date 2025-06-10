import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CadastrarLivro() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [qtdeDisponivel, setQtdeDisponivel] = useState("");
    const [isbn, setIsbn] = useState("");
    const [edicao, setEdicao] = useState("");
    const [fotoCapa, setFotoCapa] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const resposta = await fetch("http://localhost:3333/cadastrarLivro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                qtde_disponivel: qtdeDisponivel,
                isbn,
                edicao,
                caminho_foto_capa: fotoCapa,
                is_ativo: true
                })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar livro");
        }

        const dados = await resposta.json();
        console.log("Livro cadastrado com sucesso:", dados);
        navigate("/livros");
        } catch (erro) {
            console.error("Erro ao cadastrar:", erro.message);
            alert("Erro ao cadastrar livro.");
        }
    };

    return (
        <div className="flex w-full h-full">

            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex p-3 flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl">
                    <div className="flex items-center mt-2">
                        <img src="/img/iconeLivroo.png" alt="" className="w-18 h-18 mr-4" />
                        <h1 className="border-b border-gray-300 my-4 text-4xl text-[#331a08] font-semibold">Cadastrar</h1>
                    </div>
                    <div className="w-full px-16">
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-3 px-5">
                                    <label htmlFor="">
                                        ISBN:
                                    </label>
                                    <input
                                        type="text"
                                        className="h-full w-full"
                                        value={isbn}
                                        onChange={(e) => setIsbn(e.target.value)}
                                    />
                                </div>
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center px-5">
                                    <label htmlFor="" className="w-[55%]">
                                        Qntde. disp:
                                    </label>
                                    <input
                                        type="number"
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="">
                                    Título:
                                </label>
                                <input
                                    type="text"
                                    className="h-full w-full"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>

                            <div className="flex">
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-3 px-5">
                                    <label htmlFor="">
                                        Edição:
                                    </label>
                                    <input
                                        type="text"
                                        className="h-full w-full"
                                        value={edicao}
                                        onChange={(e) => setEdicao(e.target.value)}
                                    />
                                </div>

                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center px-5">
                                    <label htmlFor="">
                                        Editora:
                                    </label>
                                    <input
                                        type="email"
                                        className="h-full w-full"
                                    />
                                </div>

                            </div>

                            <div className="flex">
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-3 px-5">
                                    <label htmlFor="">
                                        Categoria:
                                    </label>
                                    <input
                                        type="text"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center px-5">
                                    <label htmlFor="">
                                        Subcategoria:
                                    </label>
                                    <input
                                        type="text"
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="">
                                    Foto???????:
                                </label>
                                <input
                                    type="text"
                                    className="h-full w-full"
                                    value={fotoCapa}
                                    onChange={(e) => setFotoCapa(e.target.value)}
                                />
                            </div>
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="">
                                    Autores:
                                </label>
                                <input
                                    type="text"
                                    className="h-full w-full"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex mb-5 mt-5">
                        <Link className="bg-[#848484] w-28 h-10 rounded-full mr-5 flex items-center justify-center" to="/livros">Cancelar</Link>
                        <Link className="bg-[#848484] w-28 h-10 rounded-full flex items-center justify-center" to="">Cadastrar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastrarLivro;
