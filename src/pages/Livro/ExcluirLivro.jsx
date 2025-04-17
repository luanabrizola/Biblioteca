import { Link } from "react-router-dom"

function ExcluirLivro(){
    return(
        <div className="flex w-full h-full">

            <div className="bg-[#f0e7c2] w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4 justify-center h-120 w-120 bg-white rounded-md">
                    <div className="flex items-center flex-col">
                        <img src="./src/img/iconeLivroo.png" alt="" className="w-18 h-18"/>
                        <h1 className="border-b border-gray-300 my-4 text-5xl"> Excluir</h1>
                    </div>
                    <div>
                        <form action="">
                            <div className="bg-[#9f6d3d]/19 rounded-md h-10 w-[90%]  flex items-center">
                                    <label htmlFor="">
                                        ISBN:
                                    </label>
                                    <input 
                                        type="text" 
                                        className="h-full w-full" 
                                    />
                                </div>
                        </form>
                    </div>
                    <div>
                        <Link className="bg-[#5b3011] text-white w-28 h-10 rounded-md mr-5  p-2 " to="/livro">Cancelar</Link>
                        <button className="bg-[#5b3011] text-white w-28 h-10 rounded-md">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExcluirLivro