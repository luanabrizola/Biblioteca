import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardEmprestimo({
  id_emprestimo,
  titulo,
  registro_academico,
  data_emprestimo,
  data_devolucao,
  foi_devolvido,
  onExcluir,
  onDevolver,
}) {
  const [verMais, setVerMais] = useState(false);

  const calcularAtrasoEDivida = () => {
    const hoje = new Date();
    const devolucao = new Date(data_devolucao);
    const diffTime = hoje - devolucao;
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDias > 0) {
      return {
        diasAtraso: diffDias,
        valorDivida: diffDias * 1.0,
      };
    }

    return {
      diasAtraso: 0,
      valorDivida: 0,
    };
  };

  const { diasAtraso, valorDivida } = calcularAtrasoEDivida();

  const definirStatus = () => {
    if (foi_devolvido) return "Concluído";

    const hoje = new Date();
    const dataDev = new Date(data_devolucao);
    return hoje > dataDev ? "Atrasado" : "Em andamento";
  };

  const status = definirStatus();

  return (
    <div className="flex flex-col bg-white w-[28%] h-auto mb-5 rounded-md p-4">
      <h1 className="text-xl font-bold mb-2 text-center break-words">{registro_academico}</h1>
      <p><span className="font-bold">Livro:</span> {titulo}</p>
      <p><span className="font-bold">Data Empréstimo:</span> {data_emprestimo}</p>
      <p><span className="font-bold">Data Devolução:</span> {data_devolucao}</p>
      <p>
        <span className="font-bold">Status:</span>{" "}
        {status === "Concluído" ? (
          <span className="text-black">Concluído</span>
        ) : status === "Atrasado" ? (
          <span className="text-black">Atrasado</span>
        ) : (
          <span className="text-black">Em andamento</span>
        )}
      </p>

      {verMais && diasAtraso > 0 && !foi_devolvido && (
        <div className="mt-2 text-red-600">
          <p><span className="font-bold">Dias de atraso:</span> {diasAtraso}</p>
          <p><span className="font-bold">Valor da dívida:</span> R$ {valorDivida.toFixed(2)}</p>
        </div>
      )}

      {verMais && diasAtraso === 0 && !foi_devolvido && (
        <p className="mt-2 text-black">Devolução em dia.</p>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setVerMais(!verMais)}
          className="text-sm font-bold  text-black hover:underline"
        >
          {verMais ? "Ver menos" : "Ver mais"}
        </button>

        <div className="flex items-center gap-3">
          {!foi_devolvido && (
            <button
              onClick={() => onDevolver(id_emprestimo)}
              className="text-sm text-black hover:underline"
            >
              Devolver
            </button>
          )}

          <span
            className="material-icons cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={() => onExcluir(id_emprestimo)}
            title="Excluir"
          >
            delete
          </span>
        </div>
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

  // *** DECLARAÇÃO CORRETA DE emprestimosFiltrados ***
  const emprestimosFiltrados = emprestimos.filter((emp) => {
    const termo = busca.toLowerCase();
    return (
      emp.titulo?.toLowerCase().includes(termo) ||
      emp.registro_academico?.toLowerCase().includes(termo)
    );
  });

  const handleExcluirEmprestimo = async (id_emprestimo) => {
    if (!window.confirm("Confirma exclusão do empréstimo?")) return;

    try {
      const resposta = await fetch("http://localhost:3333/removerEmprestimo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_emprestimo }),
      });

      if (!resposta.ok) throw new Error("Erro ao excluir empréstimo");

      setEmprestimos((prev) => prev.filter((emp) => emp.id_emprestimo !== id_emprestimo));
    } catch (erro) {
      console.error("Erro ao excluir empréstimo:", erro);
      alert("Erro ao excluir empréstimo.");
    }
  };

  const handleDevolverEmprestimo = async (id_emprestimo) => {
    if (!window.confirm("Confirma devolução do empréstimo?")) return;
  
    try {
      const resposta = await fetch("http://localhost:3333/devolverEmprestimo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_emprestimo }),
      });
  
      const dados = await resposta.json();
      console.log("Resposta da API devolverEmprestimo:", dados);
  
      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao devolver empréstimo");
      }
  
      setEmprestimos((prev) =>
        prev.map((emp) =>
          emp.id_emprestimo === id_emprestimo ? { ...emp, foi_devolvido: true } : emp
        )
      );
    } catch (erro) {
      console.error("Erro ao devolver empréstimo:", erro);
      alert(erro.message || "Erro ao devolver empréstimo.");
    }
  };

  return (
    <div className="flex flex-1 w-full min-h-screen font-poppins bg-[#f0e7c2]">
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
                  foi_devolvido={emp.foi_devolvido}
                  onExcluir={handleExcluirEmprestimo}
                  onDevolver={handleDevolverEmprestimo}
                />
              ))
            ) : (
              <p className="text-center w-full text-gray-600 mt-8">
                Nenhum empréstimo encontrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emprestimo;
