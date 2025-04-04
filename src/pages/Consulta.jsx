function Consulta(){
    return(
        <div className = 'flex w-full h-full'>
            <div className = 'flex w-full h-full'>
                <div className = 'flex-col w-2/12 h-full bg-[#5b3011] font-poppins'>
                </div>

                <div className = 'flex-col-reverse bg-[#f0e7c2] w-10/12 h-full'>
                    <div>
                        <input 
                            className="bg-[#956f54] rounded-xl w-7/12 h-10 placeholder:text-[#5b3011] placeholder:pl-4" 
                            type="text" 
                            placeholder="Digite sua busca"
                        />
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Consulta 