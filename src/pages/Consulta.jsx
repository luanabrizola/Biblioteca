import { useState } from "react";
import { Link } from "react-router-dom"

function Consulta() {

    const [verMais1, setVerMais1] = useState(false);
    const [verMais2, setVerMais2] = useState(false);

    return (
        <div className='flex w-full h-full font-poppins'>

            <div className='bg-[#f0e7c2] w-full h-full font-poppins  border-4 border-red-500'>
                <div className="mt-12 mb-20">
                    <form action="get" className="flex items-center justify-center gap-4 mt-12 flex-wrap">
                        <input
                            className="bg-[#5b3011]/48 rounded-full w-[60%] h-10 placeholder:text-[#5b3011]/44 px-3"
                            type="text"
                            placeholder="O diário de Anne Frank"
                        />
                        <select name="select" id="0" className="bg-[#5b3011]/48 text-white rounded-full h-10 w-40 font-poppins px-3 cursor-pointer">
                            <option value="0">Busca livre</option>
                            <option value="1">Título</option>
                            <option value="2">Autor</option>
                            <option value="3">Editora</option>
                            <option value="4">Categoria</option>
                            <option value="5">Subcategoria</option>
                        </select>
                        <button className="bg-[#5b3011]/48 text-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer">
                            <span className="material-icons">search</span>
                        </button>
                    </form>
                </div>

                <div className="flex flex-col items-center w-full gap-5 mt-4 mb-10">
                    <div className="flex bg-white w-[75%] h-4/12 mb-5 rounded-md">
                        <img src="/img/DiarioAnneFrank.png" className="w-45 h-70 flex self-center ml-4 mt-4 mb-4" />
                        <div className="ml-5 h-[90%] mt-4">
                            <h1 className="text-xl font-bold mb-2">O Diário de Anne Frank </h1>
                            <p>Autores: Anne Frank</p>
                            <p>Edição: Anne 99°</p>
                            <p>Editora: Record</p>
                            <p>Categoria: Biografia</p>
                            {verMais1 && (
                                <div>
                                    <p>Subcategoria: Holocausto, nazismo</p>
                                    <p>ISBN: 8501044458</p>
                                    <p>Quantidade disponível: 2 unidades</p>
                                </div>
                            )}

                            <button
                                onClick={() => setVerMais1(!verMais1)}
                                className="text-black underline font-bold mt-2 cursor-pointer"
                            >
                                {verMais1 ? "Ver menos" : "Ver mais"}
                            </button>
                        </div>

                    </div>
                    <div className="flex bg-white w-[75%] h-4/12 mb-5 rounded-md">
                        <img src="/img/AnneFrankRed.png" className="w-45 h-70 flex self-center ml-4 mt-4 mb-4" alt="" />
                        <div className="ml-5 mt-4">
                            <h1 className="text-xl font-bold mb-2">O Diário de Anne Frank </h1>
                            <p>Autores: Anne Frank</p>
                            <p>Edição:--</p>
                            <p>Editora: Record</p>
                            <p>Categoria: Biografia</p>
                            {verMais2 && (
                                <div>
                                    <p>Subcategoria: Holocausto, nazismo</p>
                                    <p>ISBN: 9788577995462</p>
                                    <p>Quantidade disponível: 5 unidades</p>
                                </div>
                            )}

                            <button
                                onClick={() => setVerMais2(!verMais2)}
                                className="text-black underline font-bold mt-2 cursor-pointer"
                            >
                                {verMais2 ? "Ver menos" : "Ver mais"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}
export default Consulta
