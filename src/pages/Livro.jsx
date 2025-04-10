function Livro(){
        return (
            <div className="flex w-full h-screen bg-[#f0e7c2]">
                <div className="w-2/12 h-full bg-[#5b3011] flex flex-col justify-between">
                    <button className="w-full h-10 rounded-e-xl font-bold text-white mt-48">Consulta</button>
                    <button className="bg-[#9f6d3d] w-full h-10 font-bold text-white">Sair</button>
                </div>
    
                <div className="flex flex-col items-center justify-center w-[65%] h-[65%] bg-white mx-auto p-6">
                    <p className="border-b border-gray-300 my-4 text-3xl">Livro</p>
                    <button className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2">Cadastrar</button>
                    <button className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl mb-2">Editar</button>
                    <button className="bg-[#5b3011] w-80 h-15 rounded-xl text-white text-2xl">Excluir</button>
                </div>
            </div>
        );
}

export default Livro