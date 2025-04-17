import { Link } from "react-router-dom";

function Professor() {
    return (
        <div className="flex w-full h-screen">


            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-[80%] h-[80%] bg-white rounded-md">
                    <div className="flex items-center flex-col">
                        <h1 className="border-b border-gray-300 my-4 text-6xl">Professor</h1>
                        <img src="./src/img/iconeProfessorr.png" alt="" className="w-42 h-42" />
                    </div>
                    <Link className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2 flex justify-center items-center" to='/cadastraprof'>Cadastrar</Link>
                    <Link className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2 flex justify-center items-center" to='/editaprof'>Editar</Link>
                    <Link className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2 flex justify-center items-center" to='/excluiprof'>Excluir</Link>
                </div>
            </div>

        </div>
    );
}

export default Professor