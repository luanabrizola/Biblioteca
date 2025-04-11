function ExcluirAluno(){
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

            <div className="bg-[#f0e7c2] w-10/12 h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-120 w-120 bg-white rounded-md">
                    <div>
                        <img src="./src/img/iconeAlunoo" alt="" />
                        <h1>Excluir</h1>
                    </div>
                    <div>
                        <form action="">
                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[90%]  flex items-center">
                                    <label htmlFor="">
                                        Registro:
                                    </label>
                                    <input 
                                        type="text" 
                                        className="h-full w-full" 
                                    />
                                </div>
                        </form>
                    </div>
                    <div>
                        <button className="bg-[#5b3011] text-white w-28 h-10 rounded-md mr-5">Cancelar</button>
                        <button className="bg-[#5b3011] text-white w-28 h-10 rounded-md">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExcluirAluno