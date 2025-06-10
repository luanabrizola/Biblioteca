import { NavLink, useLocation } from "react-router-dom";

function Menu() {
    const location = useLocation();

    const estaNaConsulta = location.pathname === "/";
    const estaNoInicio = location.pathname === "/inicio2";
    const estaNoEmprestimo = location.pathname === "/emprestimos"

    return (
        <div className='w-[300px] overflow-y-auto bg-[#5b3011] flex flex-col'>
            <img src="/img/ajl_cortada.png" alt="Logo da Biblioteca" className="w-36 self-center mt-10 mb-18" />
            <div className="flex flex-col flex-grow">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `w-full h-12 rounded-e-full font-bold flex items-center justify-center ${
                            isActive ? "bg-[#dbd0b3] text-[#5b3011]" : "text-white"
                        }`
                    }
                >
                    Consulta
                </NavLink>

                <NavLink
                    to="/inicio2"
                    className={`w-full h-12 rounded-e-full font-bold mt-2 flex items-center justify-center ${
                        location.pathname ==="/inicio2" ? "bg-[#dbd0b3] text-[#5b3011]" : "text-white"
                    }`}
                >
                    Início
                </NavLink>

                <NavLink
                    to="/emprestimos"
                    className={`w-full h-12 rounded-e-full font-bold mt-2 flex items-center justify-center ${
                        location.pathname === "/emprestimos"? "bg-[#dbd0b3] text-[#5b3011]" : "text-white"
                    }`}
                >
                    Empréstimo
                </NavLink>

                <NavLink
                    to={estaNaConsulta ? "/login" : "/"}
                    className="bg-[#9f6d3d] w-full h-12 font-bold text-white mt-auto flex items-center justify-center"
                >
                    {estaNaConsulta ? "Entrar" : "Sair"}
                </NavLink>
            </div>
        </div>
    );
}

export default Menu;
