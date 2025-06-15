import { useEffect, useState } from "react";

function Aluno() {
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    useEffect(() => {
        async function carregarAlunos() {
            try {
                const resposta = await fetch("http://localhost:3333/listarUsuarios");
                const dados = await resposta.json();
                setAlunos(dados.filter(user => user.tipo === "aluno"));
            } catch (erro) {
                console.error("Erro ao buscar alunos:", erro);
            }
        }

        carregarAlunos();
    }, []);

    const handleExcluir = async () => {
        try {
            const resposta = await fetch("http://localhost:3333/removerUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_usuario: alunoSelecionado })
            });
    
            const json = await resposta.json();
            console.log("Resposta do back-end:", json);
    
            setAlunos(prev => prev.filter(aluno => aluno.id_usuario !== alunoSelecionado));
            setMostrarConfirmacao(false);
            setAlunoSelecionado(null);
        } catch (erro) {
            console.error("Erro ao excluir aluno:", erro);
            alert("Erro ao excluir.");
        }
    };

    return (
        <div className="flex w-full h-screen">
            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-[80%] h-[90%] bg-white rounded-md overflow-y-auto p-6">
                    <h1 className="text-5xl mb-6">Alunos</h1>

                    {alunos.length === 0 ? (
                        <p className="text-gray-500">Nenhum aluno encontrado.</p>
                    ) : (
                        alunos.map(aluno => (
                            <div key={aluno.id_usuario} className="w-full mb-3 p-4 border rounded-md flex justify-between items-center">
                                <div>
                                    <p className="text-xl font-semibold">{aluno.nome}</p>
                                    <p className="text-sm text-gray-500">{aluno.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        console.log("Aluno selecionado para exclusão:", aluno.id_usuario);
                                        setAlunoSelecionado(aluno.id_usuario);
                                        setMostrarConfirmacao(true);
                                    }}
                                    className="bg-red-600 text-white px-4 py-2 rounded-xl"
                                >
                                    Excluir
                                </button>
                            </div>
                        ))
                    )}

                    {mostrarConfirmacao && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-xl text-center shadow-lg">
                                <p className="text-xl mb-4">Tem certeza que deseja excluir este aluno?</p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={handleExcluir}
                                        className="bg-red-600 text-white px-6 py-2 rounded"
                                    >
                                        Sim, excluir
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMostrarConfirmacao(false);
                                            setAlunoSelecionado(null);
                                        }}
                                        className="bg-gray-400 text-white px-6 py-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Aluno;
