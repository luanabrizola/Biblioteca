import { Link } from "react-router-dom";

function Aluno() {
    return (
        <div className="flex w-full h-screen">

            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-[80%] h-[80%] bg-white rounded-md">
                    <div className="flex items-center flex-col mb-5">
                        <h1 className="border-b border-gray-300 my-4 text-6xl">Aluno</h1>  
                        <img src="./src/img/iconeAlunoo.png" alt="" className="w-42 h-42" />  
                    </div>
                    <Link className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2 flex justify-center items-center" to='/cadastraaluno'>Cadastrar</Link>
                    <Link className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2 flex justify-center items-center" to='/editaaluno'>Editar</Link>
                    <Link className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2 flex justify-center items-center" to='/excluialuno'>Excluir</Link>
                </div>
            </div>

        </div>
    );
}

export default Aluno;
