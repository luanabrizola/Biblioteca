import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CadastrarAluno() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [registro, setRegistro] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cursos, setCursos] = useState([]);
    const [cursoSelecionado, setCursoSelecionado] = useState("");
    const [mostrarNovoCurso, setMostrarNovoCurso] = useState(false);
    const [novoCurso, setNovoCurso] = useState({ nome: "", codigo: "" });


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

            if (!resposta.ok) throw new Error("Erro ao cadastrar aluno");

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

            alert("Aluno cadastrado e curso associado com sucesso!");
            navigate("/alunos");
        } catch (erro) {
            console.error("Erro ao cadastrar aluno:", erro);
            alert("Erro ao cadastrar aluno ou associar curso.");
        }
    };

    const cadastrarCurso = async () => {
        console.log("Cadastrando curso", novoCurso);
        if (!novoCurso.nome.trim() || !novoCurso.codigo.trim()) {
            return alert("Preencha o nome e o código do curso");
        }

        const codigosExistentes = cursos.map(curso => (curso.codigo ?? "").trim());
        const nomesExistentes = cursos.map(curso => (curso.nome ?? "").trim().toLowerCase());

        if (codigosExistentes.includes(novoCurso.codigo.trim())) {
            return alert("Já existe um curso com esse código.");
        }

        if (nomesExistentes.includes(novoCurso.nome.trim().toLowerCase())) {
            return alert("Já existe um curso com esse nome.");
        }

        try {
            const resposta = await fetch("http://localhost:3333/cadastrarCurso", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: novoCurso.nome,
                    codigo: novoCurso.codigo
                })
            });

            if (!resposta.ok) throw new Error("Erro ao cadastrar curso");

            const novo = await resposta.json()

            await buscarCursos();

            setCursoSelecionado(novo.id_curso);
            setNovoCurso({ nome: "", codigo: "" });
            setMostrarNovoCurso(false);
        } catch (erro) {
            console.error("Erro ao cadastrar curso:", erro);
            alert("Erro ao cadastrar curso.");
        }
    };

    async function buscarCursos() {
            try {
                const resposta = await fetch("http://localhost:3333/listarCursos");
                const dados = await resposta.json();
                setCursos(dados);
            } catch (erro) {
                console.error("Erro ao buscar cursos:", erro);
            }
        }

    useEffect(() => {
        buscarCursos();
    }, []);


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
                            <div className="w-full mt-5 flex items-center space-x-2">
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-full flex items-center px-5">
                                    <label className="mr-2">Curso:</label>
                                    <select
                                        className="h-full w-full bg-transparent outline-none"
                                        value={cursoSelecionado}
                                        onChange={(e) => setCursoSelecionado(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione um curso</option>
                                        {cursos
                                            .filter(curso => curso.is_ativo)
                                            .map(curso => (
                                                <option key={curso.id_curso} value={curso.id_curso}>
                                                    {curso.nome}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    className="bg-[#9f6d3d]/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#9f6d3d]/48 cursor-pointer"
                                    title="Adicionar novo curso"
                                    onClick={() => {
                                        setMostrarNovoCurso(!mostrarNovoCurso)
                                        console.log("Tôa qui");
                                    }

                                    }
                                >
                                    +
                                </button>
                            </div>

                            {mostrarNovoCurso && (
                                <div className="flex items-center mt-2 space-x-2">
                                    <div className="flex w-[80%] space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Nome do novo curso"
                                            value={novoCurso.nome}
                                            onChange={(e) => setNovoCurso({ ...novoCurso, nome: e.target.value })}
                                            className="border border-gray-300 rounded-full w-[75%] py-1 px-2 outline-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Código do novo curso"
                                            value={novoCurso.codigo}
                                            onChange={(e) => setNovoCurso({ ...novoCurso, codigo: e.target.value })}
                                            className="border border-gray-300 rounded-full w-[35%] py-1 px-2 outline-none"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="bg-[#9f6d3d]/80 text-white w-[90px] py-1 rounded-full hover:bg-[#9f6d3d]/48 cursor-pointer"
                                        onClick={cadastrarCurso}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-[#848484] text-white w-[90px] py-1 rounded-full hover:bg-gray-300 cursor-pointer"
                                        onClick={() => {
                                            setNovoCurso({ nome: "", codigo: "" });
                                            setMostrarNovoCurso(false);
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}


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
