function CadastrarLivro(){
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
            <div className="flex p-3 flex-col items-center space-y-4 justify-center h-auto w-[70%] bg-white rounded-md">
                <div className="flex items-center flex-col">
                    <h1 className="border-b border-gray-300 my-4 text-5xl">Cadastrar</h1>
                    <img src="./src/img/iconeLivroo.png" alt="" className="w-18 h-18"/>
                </div>
                <div>
                    <form action="">
                        <div className="flex">
                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center mr-5">
                                <label htmlFor="">
                                    ISBN:
                                </label>
                                <input 
                                    type="text" 
                                    className="h-full w-full" 
                                />
                            </div>
                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center">
                                <label htmlFor="" className="w-[55%]">
                                    Qntde. disp:
                                </label>
                                <input 
                                    type="number" 
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                        
                        <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[100%] mt-5 flex items-center">
                            <label htmlFor="">
                                Título:
                            </label>
                            <input 
                                type="text" 
                                className="h-full w-full"
                            />
                        </div>

                        <div className="flex">
                        <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center mr-5">
                            <label htmlFor="">
                                Edição:
                            </label>
                            <input 
                                type="text" 
                                className="h-full w-full"
                            />
                        </div>

                        <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center">
                            <label htmlFor="">
                                Editora:
                            </label>
                            <input 
                                type="email" 
                                className="h-full w-full" 
                            />
                        </div>

                        </div>
                       
                       <div className="flex">
                       <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center mr-5">
                            <label htmlFor="">
                                Categoria:
                            </label>
                            <input 
                                type="text" 
                                className="h-full w-full" 
                            />
                        </div>
                        <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center">
                            <label htmlFor="">
                                Subcategoria:
                            </label>
                            <input 
                                type="text" 
                                className="h-full w-full" 
                            />
                        </div>
                       </div>
                        
                        <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[100%] mt-5 flex items-center">
                            <label htmlFor="">
                                Capa:
                            </label>
                            <input 
                                type="text" 
                                className="h-full w-full" 
                            />
                        </div>
                        <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[100%] mt-5 flex items-center">
                            <label htmlFor="">
                                Autores:
                            </label>
                            <input 
                                type="text" 
                                className="h-full w-full" 
                            />
                        </div>
                    </form>
                </div>
                <div>
                    <button className="bg-[#848484] w-28 h-10 rounded-md mr-5">Cancelar</button>
                    <button className="bg-[#848484] w-28 h-10 rounded-md">Cadastrar</button>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default CadastrarLivro;