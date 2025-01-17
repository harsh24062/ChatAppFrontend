import { Route,Routes } from 'react-router'
import App from '../App.jsx'

const AppRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/k' element={<h2>hello  world from react</h2>}/>
    </Routes>
  )
}

export default AppRoutes