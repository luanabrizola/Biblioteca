import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CadastrarProfessor() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [registro, setRegistro] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cursos, setCursos] = useState([]);
    const [cursoSelecionado, setCursoSelecionado] = useState("");

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
                    tipo: "professor",
                    is_ativo: true
                })
            });

            if (!resposta.ok) throw new Error("Erro ao cadastrar professor");

            const dados = await resposta.json();
            const id_usuario = dados.id_usuario;

            const associacao = await fetch("http://localhost:3333/associarCursoAoUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_usuario,
                    id_curso: parseInt(cursoSelecionado)
                })
            });

            if (!associacao.ok) throw new Error("Erro ao associar curso");

            alert("Professor cadastrado e curso associado com sucesso!");
            navigate("/professores");
        } catch (erro) {
            console.error("Erro ao cadastrar:", erro.message);
            alert("Erro ao cadastrar professor ou associar curso.");
        }
    };

    useEffect(() => {
        async function buscarCursos() {
            try {
                const resposta = await fetch("http://localhost:3333/listarCursos");
                const dados = await resposta.json();
                setCursos(dados);
            } catch (erro) {
                console.error("Erro ao buscar cursos:", erro);
            }
        }

        buscarCursos();
    }, []);

    return (
        <div className="flex w-full h-full">
            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl p-3">
                    <div className="flex items-center mt-2">
                        <img src="/img/iconeProfessorr.png" alt="" className="w-18 h-18 mr-4" />
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
                                <label className="mr-2">Curso:</label>
                                <select
                                    className="h-full w-full bg-transparent outline-none"
                                    value={cursoSelecionado}
                                    onChange={(e) => setCursoSelecionado(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um curso</option>
                                    {cursos.map((curso) => (
                                        <option key={curso.id_curso} value={curso.id_curso}>
                                            {curso.nome}
                                        </option>
                                    ))}
                                </select>
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
                                <Link className="bg-[#848484] w-28 h-10 rounded-full mr-5 flex items-center justify-center cursor-pointer" to="/professores">
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

export default CadastrarProfessor;
