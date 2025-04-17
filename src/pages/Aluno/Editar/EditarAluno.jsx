import { Link } from "react-router-dom"

function EditarAluno() {
    return (
        <div className="flex w-full h-full">


            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-120 w-120 bg-white rounded-md">
                    <div className="flex items-center flex-col">
                        <img src="./src/img/iconeAlunoo.png" alt="" className="w-18 h-18" />
                        <h1 className="border-b border-gray-300 my-4 text-5xl">Editar</h1>
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
                        <Link className="bg-[#5b3011] p-2 rounded-xl text-white text-2xl mr-5" to='/aluno'>Cancelar</Link>
                        <Link className="bg-[#5b3011] p-2 rounded-xl text-white text-2xl " to='/edicaoaluno'>Editar</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarAluno