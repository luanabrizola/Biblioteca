import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CadastrarAluno() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [registro, setRegistro] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const resposta = await fetch("http://localhost:3333/cadastrarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                registro_academico: registro,
                data_nascimento: dataNasc,
                email,
                telefone,
                tipo: "aluno",
                is_ativo: true
                })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar aluno");
        }

        const dados = await resposta.json();
        console.log("Aluno cadastrado com sucesso:", dados);
        navigate("/alunos");
        } catch (erro) {
            console.error("Erro ao cadastrar:", erro.message);
            alert("Erro ao cadastrar aluno.");
        }
    };

    return (
        <div className="flex w-full h-full">
        <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl p-3">
            <div className="flex items-center mt-2">
                <img src="/img/iconeAlunoo.png" alt="" className="w-18 h-18 mr-4" />
                <h1 className="border-b border-gray-300 my-4 text-4xl text-[#331a08] font-semibold">Cadastrar</h1>
            </div>

            <div className="w-full px-16">
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-5 px-5">
                        <label className="mr-2">Registro:</label>
                        <input
                            type="text"
                            className="h-full w-full bg-transparent outline-none"
                            value={registro}
                            onChange={(e) => setRegistro(e.target.value)}
                        />
                        </div>
                        <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center px-5">
                        <label className="w-[55%]">Data Nasc:</label>
                        <input
                            type="date"
                            className="h-full w-full bg-transparent outline-none"
                            value={dataNasc}
                            onChange={(e) => setDataNasc(e.target.value)}
                        />
                        </div>
                    </div>

                    <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full mt-5 flex items-center px-5">
                        <label className="mr-2">Nome:</label>
                        <input
                        type="text"
                        className="h-full w-full bg-transparent outline-none"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full mt-5 flex items-center px-5">
                        <label className="mr-2">Telefone:</label>
                        <input
                        type="tel"
                        className="h-full w-full bg-transparent outline-none"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>
                    <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full mt-5 flex items-center px-5">
                        <label className="mr-2">Email:</label>
                        <input
                        type="email"
                        className="h-full w-full bg-transparent outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex mb-5 mt-5 justify-center">
                        <Link className="bg-[#848484] w-28 h-10 rounded-full mr-5 flex items-center justify-center cursor-pointer" to="/alunos">
                            Cancelar
                        </Link>
                        <button type="submit" className="bg-[#848484] w-28 h-10 rounded-full flex items-center justify-center cursor-pointer">
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

export default CadastrarAluno;
