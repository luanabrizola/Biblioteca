import { Link } from "react-router-dom"

function CadastrarProfessor() {
    return (
        <div className="flex w-full h-full">


            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-[70%] w-[70%] bg-white rounded-md">
                    <div className="flex items-center flex-col">
                        <h1 className="border-b border-gray-300 my-4 text-5xl">Cadastrar</h1>
                        <img src="/img/iconeProfessorr.png" alt="" className="w-18 h-18" />
                    </div>
                    <div>
                        <form action="">
                            <div className="flex">
                                <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center mr-5">
                                    <label htmlFor="">
                                        Registro:
                                    </label>
                                    <input
                                        type="text"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[50%] mt-5 flex items-center">
                                    <label htmlFor="" className="w-[55%]">
                                        Data Nasc:
                                    </label>
                                    <input
                                        type="date"
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[100%] mt-5 flex items-center">
                                <label htmlFor="">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[100%] mt-5 flex items-center">
                                <label htmlFor="">
                                    Telefone:
                                </label>
                                <input
                                    type="tel"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[100%] mt-5 flex items-center">
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
                    <div>
                        <Link className="bg-[#848484] p-2 rounded-md mr-5" to="/professor">Cancelar</Link>
                        <button className="bg-[#848484] w-28 h-10 rounded-md">Cadastrar</button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CadastrarProfessor
