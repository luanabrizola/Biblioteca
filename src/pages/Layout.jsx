import Menu from '../Componentes/Menu.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex h-screen overflow-y-auto">
      <Menu />
      <div className="flex-1 h-full overflow-y-auto">
        <Outlet  />
      </div>
    </div>
  )
}

export default Layout
