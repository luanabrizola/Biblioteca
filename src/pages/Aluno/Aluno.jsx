import { Link } from "react-router-dom";

function Aluno() {
    return (
        <div className="flex w-full h-screen">
            <div className = 'w-2/12 h-full bg-[#5b3011] flex flex-col'>
                <img src="./src/img/ajl_cortada.png" alt="" className="w-36 flex self-center mt-5 mb-5" />
                <div className="flex flex-col flex-grow">
                    <button className='w-full h-10 rounded-e-xl font-bold text-white'>Consulta</button>
                    <button className='bg-[#dbd0b3] w-full h-10 rounded-e-xl font-bold text-white mt-5'>Início</button>
                    <button className='bg-[#9f6d3d] w-full h-10 font-bold text-white mt-auto'>Sair</button>
                </div>
            </div>

            <div className="bg-[#f0e7c2] w-10/12 h-full flex flex-col items-center justify-center">
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
