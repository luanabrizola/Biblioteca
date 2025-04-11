function Login(){
    return(
        <div className="flex w-full h-full justify-center items-center bg-[url(./src/img/width_800.jpeg)] bg-cover">
            <div className="flex flex-col justify-center items-center w-1/3 h-[62%] bg-white/40 rounded-md m-0 p-0">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <img src="./src/img/ajl_cortada.png" alt="" className="w-32 h-32" />
                        </div>
                        <form className="flex flex-col">
                            <div>
                                <p className="text-[#5b3011]">Login</p>
                                <input type="text" className="bg-[#9f6d3d]/19 rounded-md h-10 w-80"/>
                            </div>
                            <div>
                                <p className="text-[#5b3011]">Senha</p>
                                <input 
                                    type="text" 
                                    className="bg-[#9f6d3d]/19 rounded-md h-10 w-80 placeholder:text-[#5b3011]/33" 
                                    placeholder="Digite sua senha"
                                />
                            </div>
                            <a href="" className="text-[#5b3011]">Esqueceu a senha?</a>  
                        </form>
                    </div>
                    <div className="flex self-start ml-4">
                        <img className="w-16 h-48" src="./src/img/marcador.png" alt="" />
                    </div>
                    
                </div>   
                <button className="bg-[#ad795b] text-white font-bold rounded-md h-10 w-40">Entrar</button>
            </div>
        </div>
    )
}
export default Login 