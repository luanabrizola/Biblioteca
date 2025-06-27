import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardEmprestimo({
  id_emprestimo,
  titulo,
  registro_academico,
  data_emprestimo,
  data_devolucao,
  onExcluir,
}) {
  const [verMais, setVerMais] = useState(false);

  return (
    <div className="flex flex-col bg-white w-[28%] h-auto mb-5 rounded-md p-4">
      <h1 className="text-xl font-bold mb-2 text-center break-words">{registro_academico}</h1>
      <p>
        <span className="font-bold">Livro:</span> {titulo}
      </p>
      <p>
        <span className="font-bold">Data Empréstimo:</span> {data_emprestimo}
      </p>
      <p>
        <span className="font-bold">Data Devolução:</span> {data_devolucao}
      </p>

      {verMais && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md sm:w-[50%] md:w-[35%] flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">{titulo}</h1>
            <p className="mb-2"><span className="font-bold">Registro:</span> {registro_academico}</p>
            <p className="mb-2"><span className="font-bold">Data Empréstimo:</span> {data_emprestimo}</p>
            <p className="mb-2"><span className="font-bold">Data Devolução:</span> {data_devolucao}</p>
            <button
              onClick={() => setVerMais(false)}
              className="bg-[#5b3011]/48 text-white rounded-full px-4 py-2 mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setVerMais(true)}
        className="text-black underline font-bold mt-2 cursor-pointer hover:text-[#5b3011] transition-colors duration-300"
      >
        Ver mais
      </button>

      <div className="flex space-x-3 mt-2">
        <span
          className="material-icons cursor-pointer hover:text-red-500 transition-colors duration-300"
          onClick={() => onExcluir(id_emprestimo)}
          title="Excluir"
        >
          delete
        </span>
      </div>
    </div>
  );
}

function Emprestimo() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarEmprestimos() {
      try {
        const resposta = await fetch("http://localhost:3333/listarEmprestimo");
        if (!resposta.ok) throw new Error("Erro ao buscar empréstimos");
        const dados = await resposta.json();
        setEmprestimos(dados);
      } catch (erro) {
        console.error("Erro ao carregar empréstimos:", erro);
      }
    }

    carregarEmprestimos();
  }, []);

  const handleExcluirEmprestimo = async (id_emprestimo) => {

    try {
      const resposta = await fetch("http://localhost:3333/removerEmprestimo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_emprestimo }),
      });

      if (!resposta.ok) throw new Error("Erro ao excluir empréstimo");

      setEmprestimos((prev) =>
        prev.filter((emp) => emp.id_emprestimo !== id_emprestimo)
      );
    } catch (erro) {
      console.error("Erro ao excluir empréstimo:", erro);
      alert("Erro ao excluir empréstimo.");
    }
  };

  const emprestimosFiltrados = emprestimos.filter((emp) => {
    const termo = busca.toLowerCase();
    return (
      emp.titulo?.toLowerCase().includes(termo) ||
      emp.registro_academico?.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="flex flex-1 w-full font-poppins bg-[#f0e7c2]">
      <div className="w-full px-10 flex flex-col items-center">
        <form
          className="flex w-full justify-center gap-4 mt-12 mb-14"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="bg-[#5b3011]/48 rounded-full w-[74%] h-12 text-white placeholder:text-[#5b3011]/44 px-3"
            type="text"
            placeholder="Buscar empréstimo por título ou registro"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer"
          >
            <span className="material-icons">search</span>
          </button>
          <Link
            className="bg-[#5b3011]/48 text-white rounded-full h-12 w-40 px-3 cursor-pointer flex items-center"
            to="/cadastraemprestimo"
          >
            <i className="material-icons mr-3">add</i>
            <span className="text-center">Cadastrar</span>
          </Link>
        </form>

        <div className="flex gap-4 mb-4 font-semibold">
          <button>Título</button>
          <button>Registro</button>
          <button>Data</button>
        </div>

        <div className="flex flex-col w-full rounded-md mt-10 mb-5">
          <div className="flex justify-center gap-5 flex-wrap w-full">
            {emprestimosFiltrados.length > 0 ? (
              emprestimosFiltrados.map((emp) => (
                <CardEmprestimo
                  key={emp.id_emprestimo}
                  id_emprestimo={emp.id_emprestimo}
                  titulo={emp.titulo}
                  registro_academico={emp.registro_academico}
                  data_emprestimo={emp.data_emprestimo}
                  data_devolucao={emp.data_devolucao}
                  onExcluir={handleExcluirEmprestimo}
                />
              ))
            ) : (
              <p className="text-center w-full text-gray-600 mt-8">Nenhum empréstimo encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emprestimo;
