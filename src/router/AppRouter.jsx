import { Route, Routes } from 'react-router-dom';
import Body from '../pages/Body';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Body/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default AppRouter;