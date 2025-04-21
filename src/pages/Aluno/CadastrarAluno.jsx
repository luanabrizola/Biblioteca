import { Link } from "react-router-dom"

function CadastrarAluno(){
    return(
        <div className="flex w-full h-full">


            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-auto w-[60%] bg-white rounded-xl p-3">
                    <div className="flex items-center mt-2">
                        <img src="/img/iconeAlunoo.png" alt="" className="w-18 h-18 mr-4" />
                        <h1 className="border-b border-gray-300 my-4 text-5xl text-[#331a08] font-semibold">Cadastrar</h1>
                    </div>
                    <div className="w-full px-16">
                        <form action="">
                            <div className="flex">
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center mr-5 px-5">
                                    <label htmlFor="">
                                        Registro:
                                    </label>
                                    <input
                                        type="text"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[50%] mt-5 flex items-center px-5">
                                    <label htmlFor="" className="w-[55%]">
                                        Data Nasc:
                                    </label>
                                    <input
                                        type="date"
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="">
                                    Telefone:
                                </label>
                                <input
                                    type="tel"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="bg-[#9f6d3d]/19 rounded-full h-10 w-[100%] mt-5 flex items-center px-5">
                                <label htmlFor="">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    className="h-full w-full"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex mb-5 mt-5">
                        <Link className="bg-[#848484] w-28 h-10 rounded-full mr-5 flex items-center justify-center" to="/alunos">Cancelar</Link>
                        <Link className="bg-[#848484] w-28 h-10 rounded-full flex items-center justify-center">Cadastrar</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastrarAluno

