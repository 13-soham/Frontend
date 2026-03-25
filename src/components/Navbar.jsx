import axios from "axios";
import { BsChatHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";
import { removeUser } from "../Redux/features/userSlice";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout(){
        try {
            await axios.post(BASE_URL + "/logout", 
                {},
                { withCredentials : true }
            );

            // console.log("logged out");
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className="navbar bg-base-300 shadow-sm px-10 py-7">
            <div className="flex-1 flex">
                <Link to="/" className="text-4xl text-yellow-400 mx-2 cursor-pointer">Amble</Link>
                <BsChatHeart className="text-2xl text-red-400" />
            </div>
            {user && <div className="flex gap-2">
                <p className="my-auto mr-5 text-lg hover:bg-base-100 p-3 rounded-lg"><Link to="/connections">Connections</Link></p>
                <p className="my-auto mr-5 text-lg">Hi, {user.firstName}</p>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar h-16 w-16">
                        <div className="w-20 rounded-full">
                            <img
                                alt="lol"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-3 shadow border border-amber-300">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li>
                            <a onClick={()=>{
                                handleLogout();
                            }}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default Navbar;