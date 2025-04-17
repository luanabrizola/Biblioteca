import Menu from '../Componentes/Menu.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex h-screen">
      <Menu />
      <div className="flex-grow h-full"> 
        <Outlet  />
      </div>
    </div>
  )
}

export default Layout
