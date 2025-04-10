function Login(){
    return(
        <div className="flex w-full h-full justify-center items-center bg-[url(./src/img/width_800.jpeg)] bg-cover">
            <div className="flex flex-col justify-center items-center w-1/3 h-1/3 bg-white opacity-20 rounded-md">
                <div>
                    <p>Login</p>
                    <input type="text" />
                </div>
                <div>
                    <p>Senha</p>
                    <input type="text" placeholder="Digite sua senha"/>
                </div>
                <a href="">Esqueceu a senha?</a>  
                <button className="bg-[#ad795b] text-white font-bold rounded-md h-10 w-40">Entrar</button>
            </div>
        </div>
    )
}
export default Login 