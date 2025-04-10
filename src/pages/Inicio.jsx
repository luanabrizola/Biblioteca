function Inicio(){
    return(
        <div className="flex w-full h-full bg-[#f0e7c2] ">
            <div className = 'w-2/12 h-full bg-[#5b3011] flex flex-col justify-between'>
                <button className=' w-full h-10 rounded-e-xl font-bold text-white mt-48'>Consulta</button>
                <button className='bg-[#9f6d3d] w-full h-10 font-bold text-white'>Sair</button>
            </div>

            <div className="flex flex-col items-center space-y-4 justify-center h-full w-full ">
                <button className="bg-[#5b3011] w-120 h-20 rounded-xl text-white text-2xl">Aluno</button>
                <button className="bg-[#5b3011] w-120 h-20 rounded-xl text-white text-2xl"> Professor</button>
                <button className="bg-[#5b3011] w-120 h-20 rounded-xl text-white text-2xl">Livro</button>
            </div>
        </div>
    )
}
export default Inicio 