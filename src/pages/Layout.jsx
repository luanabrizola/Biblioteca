import Menu from '../Componentes/Menu.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex h-screen">
      <Menu />
      <div className="flex-1 overflow-y-auto">
        <Outlet  />
      </div>
    </div>
  )
}

export default Layout
