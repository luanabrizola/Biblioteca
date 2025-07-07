import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate()

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const validarLogin = async (e) => {
        e.preventDefault();
        console.log("Botão clicado, iniciando validação");

        try {
            const response = await fetch("http://localhost:3333/listarBibliotecario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, senha }),
            });

            const data = await response.text();
            console.log("Resposta do servidor:", data);

            if (response.ok) {
                navigate("/inicio");
            } else {
                setErro(data.message || "Login ou senha inválidos.");
            }
        } catch (error) {
            setErro("Erro ao conectar com o servidor.");
            console.error(error);
        }
    };

    return (
        <div className="flex w-full h-full justify-center items-center bg-[url(/img/width_800.jpeg)] bg-cover">
            <div className="flex flex-col items-center w-1/3 h-[80%] bg-white/40 rounded-md m-0 p-0">
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div className="flex justify-center mt-16 mb-5">
                            <img src="/img/ajl_cortada.png" alt="" className="w-32 h-32" />
                        </div>
                        <form className="flex flex-col" onSubmit={validarLogin}>
                            <div>
                                <p className="text-[#5b3011]">Login</p>
                                <div className="flex bg-[#9f6d3d]/19 rounded-full h-10 w-80 items-center text-black/19">
                                    <label htmlFor="" className="w-[10%] ml-2">
                                        <span className="material-icons">person</span>
                                    </label>
                                    <input
                                        id="login"
                                        type="text"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
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
                                        id="senha"
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Digite sua senha"
                                        className="text-[#5b3011]/33 h-full w-full"
                                    />
                                </div>
                            </div>
                            <a href="" className="text-[#5b3011]">Esqueceu a senha?</a>
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-[#ad795b] text-white font-bold rounded-full h-12 w-42 mt-4 mb-4 cursor-pointer"
                                    type="submit"
                                >
                                    Entrar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Login

// SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data Login.jsx:33:20
//     validarLogin Login.jsx:33
//     React 8
