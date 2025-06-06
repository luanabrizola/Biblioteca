import { Link } from "react-router-dom"

function Page404(){
    return(
        <div className="bg-[#5b3011]/80 w-full h-full flex items-center justify-center">
            <div className="bg-white w-[80%] h-[80%] rounded-xl flex flex-col items-center">
                <div className="mt-5 items-center flex justify-center">
                    <p className="text-5xl">ERRO 404</p>
                </div>
                <div className="border-b border-gray-300 ">
                    <p className="text-4xl mt-20 ">Ops, essa página não foi encontrada</p>
                </div>
                
                <p className="text-2xl mt-30">Para voltar à biblioteca aperte o botão</p>
                <Link className="p-5 text-white  bg-[#5b3011] rounded-md mt-6 " to="/">Voltar</Link>
            </div>
        </div>
    )
}

export default Page404