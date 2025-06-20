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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          qtde_disponivel: qtdeDisponivel,
          isbn,
          edicao,
          caminho_foto_capa: fotoCapa,
          is_ativo: true,
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao cadastrar livro");

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
            <h1 className="border-b border-gray-300 my-4 text-4xl text-[#331a08] font-semibold">Cadastrar Livro</h1>
          </div>

          <div className="w-full px-16">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-3 px-5">
                  <label className="mr-2">ISBN:</label>
                  <input
                    type="text"
                    className="h-full w-full bg-transparent outline-none"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center px-5">
                  <label className="mr-2">Qtd. disp:</label>
                  <input
                    type="number"
                    className="h-full w-full bg-transparent outline-none"
                    value={qtdeDisponivel}
                    onChange={(e) => setQtdeDisponivel(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                <label className="mr-2">Título:</label>
                <input
                  type="text"
                  className="h-full w-full bg-transparent outline-none"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                <label className="mr-2">Edição:</label>
                <input
                  type="text"
                  className="h-full w-full bg-transparent outline-none"
                  value={edicao}
                  onChange={(e) => setEdicao(e.target.value)}
                />
              </div>

              <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                <label className="mr-2">Foto da capa:</label>
                <input
                  type="file"
                  className="h-full w-full bg-transparent outline-none"
                  value={fotoCapa}
                  onChange={(e) => setFotoCapa(e.target.value)}
                />
              </div>

              <div className="flex justify-center mt-8 mb-4">
                <Link
                  className="bg-[#848484] w-28 h-10 rounded-full mr-5 flex items-center justify-center text-white"
                  to="/livros"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="bg-[#5b3011] w-28 h-10 rounded-full flex items-center justify-center text-white"
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

export default CadastrarLivro;
