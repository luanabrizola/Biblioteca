import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

function Menu() {
    const location = useLocation();

    const estaNaConsulta = location.pathname === "/";
    const estaNoInicio = location.pathname === "/inicio";
    const estaNoEmprestimo = location.pathname === "/emprestimos"

    const [isOpen, setIsOpen] = useState(false);
    const menuSelecionado = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={menuSelecionado}
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#5b3011] text-white p-2 rounded"
            >
                <span className="material-icons text-3xl">
                    {isOpen ? "close" : "menu"}
                </span>
            </button>
            <div className={`
                bg-[#5b3011] overflow-y-auto text-white flex flex-col
                fixed top-0 left-0 h-full w-full z-40 w-64 lg:w-[300px]
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:static lg:flex`
            }>
                <img src="/img/ajl_cortada.png" alt="Logo da Biblioteca" className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] md:w-[100px] md:h-[100px] lg:w-36 lg:h-36 self-center mt-10 mb-18" />
                <div className="flex flex-col flex-grow">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `w-full h-12 rounded-e-full font-bold flex items-center justify-center ${isActive ? "bg-[#dbd0b3] text-[#5b3011]" : "text-white"
                            }`
                        }
                    >
                        Consulta
                    </NavLink>

                    <NavLink
                        to="/inicio"
                        className={`w-full h-12 rounded-e-full font-bold mt-2 flex items-center justify-center ${location.pathname === "/inicio2" ? "bg-[#dbd0b3] text-[#5b3011]" : "text-white"
                            }`}
                    >
                        Início
                    </NavLink>

                    <NavLink
                        to="/emprestimos"
                        className={`w-full h-12 rounded-e-full font-bold mt-2 flex items-center justify-center ${location.pathname === "/emprestimos" ? "bg-[#dbd0b3] text-[#5b3011]" : "text-white"
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
        </>
    );
}

export default Menu;
