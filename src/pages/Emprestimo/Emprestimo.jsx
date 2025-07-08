import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardEmprestimo({
  id_emprestimo,
  titulo,
  registro_academico,
  data_emprestimo,
  data_devolucao,
  data_devolucao_efetiva,
  foi_devolvido,
  onExcluir,
  onDevolver,
  foi_pago,
  onPagar,
}) {
  const [verMais, setVerMais] = useState(false);

  const calcularAtrasoEDivida = () => {
    const hoje = new Date();
    const devolucao = new Date(data_devolucao);

    const diffTime = hoje - devolucao;
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const diffTimeDev = data_devolucao_efetiva
      ? new Date(data_devolucao_efetiva) - devolucao
      : 0;
    const diffDiasDev = Math.floor(diffTimeDev / (1000 * 60 * 60 * 24));

    if (foi_devolvido && diffDiasDev > 0) {
      return {
        diasAtraso: diffDiasDev,
        valorDivida: diffDiasDev * 1.0,
      };
    }

    if (diffDias > 0 && !foi_devolvido) {
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
    if (foi_devolvido, data_devolucao, data_devolucao_efetiva) {
      const prevista = new Date(data_devolucao).toISOString().split("T")[0];
      const efetiva = new Date(data_devolucao_efetiva).toISOString().split("T")[0];

      if (efetiva > prevista) {
        return "Pagamento necessário";
      } else {
        return "Concluído";
      }
    }

    if(foi_pago){
      return "Concluído"
    }

    const hoje = new Date();
    const dataDev = new Date(data_devolucao);
    return hoje > dataDev ? "Atrasado" : "Em andamento";
  };

  const status = definirStatus();

  return (
    <div className="flex flex-col bg-white w-[30%] h-auto mb-5 rounded-md p-4">
      <h1 className="text-xl font-bold mb-2 text-center break-words">
        {registro_academico}
      </h1>
      <p><span className="font-bold">Livro:</span> {titulo}</p>
      <p><span className="font-bold">Data Empréstimo:</span> {data_emprestimo.split('T')[0]}</p>
      <p><span className="font-bold">Data Devolução:</span> {data_devolucao.split('T')[0]}</p>
      <p>
        <span className="font-bold">Status:</span>{" "}
        {status === "Concluído" && <span className="text-black">Concluído</span>}
        {status === "Atrasado" && <span className="text-black">Atrasado</span>}
        {status === "Em andamento" && <span className="text-black">Em andamento</span>}
        {status === "Pagamento necessário" && (
          <span className="text-red-600">Multa Pendente</span>
        )}
      </p>


      {verMais && valorDivida > 0 && foi_devolvido && (
        <>
          {!foi_pago ? (
            <button
              onClick={() => onPagar(id_emprestimo)}
              className="mt-2 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
            >
              Marcar como paga
            </button>
          ) : (
            <p className="text-green-700 mt-2">Dívida paga.</p>
          )}
        </>
      )}

      {verMais && diasAtraso > 0 && (
        <div className="mt-2 text-red-600">
          <p><span className="font-bold">Dias de atraso:</span> {diasAtraso}</p>
          <p><span className="font-bold">Valor da dívida:</span> R$ {valorDivida.toFixed(2)}</p>
        </div>
      )}

      {verMais && foi_pago && (
        <p className="mt-2 text-black">Devolução em dia.</p>
      )}

      {verMais && diasAtraso === 0 && foi_devolvido && (
        <p className="mt-2 text-black">Devolução em dia.</p>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setVerMais(!verMais)}
          className="text-sm font-bold text-black hover:underline"
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
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarEmprestimos() {
      try {
        const resposta = await fetch("http://localhost:3333/listarEmprestimo");
        if (!resposta.ok) throw new Error("Erro ao buscar empréstimos");
        const dados = await resposta.json();
        setEmprestimos(dados);
      } catch (erro) {
        console.error("Erro ao carregar empréstimos:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarEmprestimos();
  }, []);

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

      setEmprestimos((prev) =>
        prev.filter((emp) => emp.id_emprestimo !== id_emprestimo)
      );
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
          emp.id_emprestimo === id_emprestimo
            ? { ...emp, foi_devolvido: true }
            : emp
        )
      );
    } catch (erro) {
      console.error("Erro ao devolver empréstimo:", erro);
      alert(erro.message || "Erro ao devolver empréstimo.");
    }
  };


  const handlePagarDivida = async (id_emprestimo) => {
    if (!window.confirm("Confirma o pagamento da dívida?")) return;

    try {
      const resposta = await fetch("http://localhost:3333/pagarDivida", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_emprestimo }),
      });

      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || "Erro ao pagar dívida");

      setEmprestimos((prev) =>
        prev.map((emp) =>
          emp.id_emprestimo === id_emprestimo
            ? { ...emp, foi_pago: true }
            : emp
        )
      );
    } catch (erro) {
      console.error("Erro ao pagar dívida:", erro);
      alert("Erro ao pagar dívida.");
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

        <div className="flex flex-col w-full rounded-md mt-10 mb-5">
          <div className="flex justify-center gap-5 flex-wrap w-full">
            {carregando ? (
              <p className="text-center w-full text-gray-600 mt-8">
                Carregando empréstimos...
              </p>
            ) : emprestimosFiltrados.length > 0 ? (
              emprestimosFiltrados.map((emp) => (
                <CardEmprestimo
                  key={emp.id_emprestimo}
                  id_emprestimo={emp.id_emprestimo}
                  titulo={emp.titulo}
                  registro_academico={emp.registro_academico}
                  data_emprestimo={emp.data_emprestimo}
                  data_devolucao={emp.data_devolucao}
                  data_devolucao_efetiva={emp.data_devolucao_efetiva}
                  foi_devolvido={emp.foi_devolvido}
                  onExcluir={handleExcluirEmprestimo}
                  onDevolver={handleDevolverEmprestimo}
                  onPagar={handlePagarDivida} 
                  foi_pago={emp.foi_pago}
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
