function Inicio(){
    return(
        <div className="flex w-full h-full">
            <div className = 'w-2/12 h-full bg-[#5b3011] flex flex-col'>
                <img src="./src/img/ajl_cortada.png" alt="" className="w-36 flex self-center mt-5 mb-5" />
                <div className="flex flex-col flex-grow">
                    <button className='w-full h-10 rounded-e-xl font-bold text-white'>Consulta</button>
                    <button className='bg-[#dbd0b3] w-full h-10 rounded-e-xl font-bold text-white mt-5'>Início</button>
                    <button className='bg-[#9f6d3d] w-full h-10 font-bold text-white mt-auto'>Sair</button>
                </div>
            </div>

            <div className=" bg-[#f0e7c2] w-10/12 h-full">
                <div className="flex flex-col items-center space-y-4 justify-center h-full w-full ">
                    <button className="bg-[#5b3011] w-120 h-20 rounded-xl text-white text-2xl">Aluno</button>
                    <button className="bg-[#5b3011] w-120 h-20 rounded-xl text-white text-2xl"> Professor</button>
                    <button className="bg-[#5b3011] w-120 h-20 rounded-xl text-white text-2xl">Livro</button>
                </div>
            </div>

        </div>
    )
}
export default Inicio 