import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate()

    const irParaInicio = () => {
        navigate("/inicio")
    }

    return(
        <div className="flex w-full h-full justify-center items-center bg-[url(/img/width_800.jpeg)] bg-cover">
            <div className="flex flex-col items-center w-1/3 h-[62%] bg-white/40 rounded-md m-0 p-0">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div className="flex justify-center mt-16 mb-5">
                            <img src="/img/ajl_cortada.png" alt="" className="w-32 h-32" />
                        </div>
                        <form className="flex flex-col">
                            <div>
                                <p className="text-[#5b3011]">Login</p>
                                <div className="flex bg-[#9f6d3d]/19 rounded-full h-10 w-80 items-center text-black/19">
                                    <label htmlFor="" className="w-[10%] ml-2">
                                        <span className="material-icons">person</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="text-[#5b3011]/33 h-full w-full"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 mb-1">
                                <p className="text-[#5b3011]">Senha</p>
                                <div className="flex bg-[#9f6d3d]/19 rounded-full h-10 w-80 items-center text-black/19">
                                    <label htmlFor="" className="w-[10%] ml-2">
                                        <span className="material-icons">lock</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="text-[#5b3011]/33 h-full w-full"
                                        placeholder="Digite sua senha"
                                    />
                                </div>
                            </div>
                            <a href="" className="text-[#5b3011]">Esqueceu a senha?</a>
                        </form>
                    </div>
                    <div className="flex self-start ml-4">
                        <img className="w-16 h-48" src="/img/marcador.png" alt="" />
                    </div>

                </div>
                <button
                    className="bg-[#ad795b] text-white font-bold rounded-full h-12 w-42 mt-10 cursor-pointer"
                    onClick={irParaInicio}
                >
                    Entrar
                </button>
            </div>
        </div>
    )
}
export default Login
