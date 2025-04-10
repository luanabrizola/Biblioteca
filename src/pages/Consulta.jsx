// import { IconSearch } from '@tabler/icons-react';

function Consulta(){
    return(
        <div className = 'flex w-full h-full'>
            <div className = 'w-2/12 h-full bg-[#5b3011] flex flex-col justify-between'>
                <button className='bg-[#dbd0b3] w-full h-10 rounded-e-xl font-bold text-white mt-48'>Consulta</button>
                <button className='bg-[#9f6d3d] w-full h-10 font-bold text-white'>Entrar</button>
            </div>

            <div className = 'bg-[#f0e7c2] w-10/12 h-full'>
                <div className="mt-12">
                    <form action="get" className="flex items-center justify-center gap-4 mt-12 ml-4 flex-wrap">
                        <input 
                            className="bg-[#956f54] rounded-xl w-7/12 h-10 placeholder:text-[#5b3011]" 
                            type="text" 
                            placeholder="Digite sua busca"
                        />
                        <select name="select" id="0" className="bg-[#956f54] text-white rounded-xl h-10 w-40 font-poppins">
                            <option value="0">Busca livre</option>
                            <option value="1">Título</option>
                            <option value="2">Autor</option>
                            <option value="3">Editora</option>
                            <option value="4">Categoria</option>
                            <option value="5">Subcategoria</option>
                        </select>
                        <button className="bg-[#956f54] text-white rounded-full h-10 w-10 flex items-center justify-center">
                            {/* <IconSearch></IconSearch> */}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Consulta 