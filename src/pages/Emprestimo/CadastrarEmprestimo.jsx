import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CadastrarEmprestimo() {
    const navigate = useNavigate();

    const [registro, setRegistro] = useState("");
    const [data, setData] = useState("");
    const [isbn, setIsbn] = useState("");
    const [devolucao, setDevolucao] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!registro || !data || !isbn || !devolucao) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3333/cadastrarEmprestimo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_usuario: registro,         
                    id_livro: isbn,               
                    data_emprestimo: data,      
                    data_devolucao: devolucao,   
                    is_ativo: true,              
                }),
            });

            if (!resposta.ok) {
                const texto = await resposta.text();
                console.error("Erro na resposta da API:", texto);
                alert("Erro ao cadastrar empréstimo. Veja detalhes no console.");
                return;
            }

            const dados = await resposta.json();
            alert("Empréstimo cadastrado com sucesso!");
            navigate("/emprestimos");
        } catch (erro) {
            console.error("Erro ao cadastrar empréstimo:", erro);
            alert("Erro de rede ou servidor. Verifique a conexão com o backend.");
        }
    };

    return (
        <div className="flex w-full h-full">
            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl p-3">
                    <h1 className="border-b border-gray-300 my-4 text-5xl text-[#331a08] font-semibold">Empréstimo</h1>
                    <div className="w-full px-16">
                        <form onSubmit={handleSubmit}>
                            {}
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="registro_academico">Registro:</label>
                                <input
                                    type="text"
                                    id="registro_academico"
                                    value={registro}
                                    onChange={(e) => setRegistro(e.target.value)}
                                    className="h-full w-full"
                                />
                            </div>

                            {}
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="data">Data:</label>
                                <input
                                    type="date"
                                    id="data"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    className="h-full w-full"
                                />
                            </div>

                            {}
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="isbn">ISBN:</label>
                                <input
                                    type="text"
                                    id="isbn"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                    className="h-full w-full"
                                />
                            </div>

                            {}
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="devolucao">Devolução:</label>
                                <input
                                    type="date"
                                    id="devolucao"
                                    value={devolucao}
                                    onChange={(e) => setDevolucao(e.target.value)}
                                    className="h-full w-full"
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
