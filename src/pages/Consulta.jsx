function Consulta(){
    return(
        <div className = 'flex w-full h-full'>
            <div className = 'flex w-full h-full'>
                <div className = 'flex-col w-2/12 h-full bg-[#5b3011] font-poppins'>
                </div>

                <div className = 'flex-col-reverse bg-[#f0e7c2] w-10/12 h-full'>
                    <div className="mt-12">
                        <form action="get">
                            <input 
                                className="bg-[#956f54] rounded-xl w-7/12 h-10 ml-4 placeholder:text-[#5b3011] placeholder:pl-4" 
                                type="text" 
                                placeholder="Digite sua busca"
                            />
                            <select name="select" id="0" className="bg-[#956f54] rounded-xl h-10 ml-4 w-40">
                                <option value="0">Busca livre</option>
                            </select>
                            <button className="bg-[#956f54] rounded-[50%] h-10 w-10 ml-4">
                                x
                            </button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Consulta 