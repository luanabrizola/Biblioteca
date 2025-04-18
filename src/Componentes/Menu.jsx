function Menu() {
    return (
        <div className='w-2/12 h-full bg-[#5b3011] flex flex-col'>
            <img src="/img/ajl_cortada.png" alt="Logo da Biblioteca" className="w-36 self-center mt-5 mb-18" />
            <div className="flex flex-col flex-grow">
                <button className='w-full h-10 rounded-e-full font-bold text-white'>Consulta</button>
                <button className='bg-[#dbd0b3] text-[#5b3011] w-full h-10 rounded-e-full font-bold mt-2'>Início</button>
                <button className='bg-[#9f6d3d] w-full h-10 font-bold text-white mt-auto'>Sair</button>
            </div>
        </div>
    );
}

export default Menu;
