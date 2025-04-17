import { Link } from "react-router-dom"

function Inicio(){
    return(
        <div className="flex w-full h-full">
            <div className=" flex bg-[#f0e7c2] w-full h-full justify-center">
                <div className="flex flex-col items-center space-y-6 justify-center">
                    <Link className="bg-[#5b3011] w-80 h-20 rounded-xl text-white text-2xl flex items-center justify-center" to='/aluno'>Aluno</Link>
                    <Link className="bg-[#5b3011] w-80 h-20 rounded-xl text-white text-2xl flex items-center justify-center" to='/professor'> Professor</Link>
                    <Link className="bg-[#5b3011] w-80 h-20 rounded-xl text-white text-2xl flex items-center justify-center" to='/livro'>Livro</Link>
                </div>
            </div>

        </div>
    )
}
export default Inicio 