import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../Redux/features/userSlice";
import axios from 'axios';
import { BASE_URL } from '../utils/constraints';
import { useEffect } from 'react';

const Body = () => {
  // body only load when user is authenticate
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  async function fetchUser(){
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials : true });  
      dispatch(addUser(res.data.user)); 
    } catch (err) {
      if(err.status === 401) navigate("/login");
    }
  }

  useEffect(()=>{
    if(!userData) fetchUser();
  }, []);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body;