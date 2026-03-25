import { Route, Routes } from 'react-router-dom';
import Body from '../pages/Body';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Feed from '../pages/Feed';
import Signup from '../pages/Signup';
import Connections from '../pages/Connections';
import PendingReq from '../pages/PendingReq';

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Body/>}>
                <Route path='/' element={<Feed/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/connections' element={<Connections/>}/>
                <Route path='/pendingReq' element={<PendingReq/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default AppRouter;