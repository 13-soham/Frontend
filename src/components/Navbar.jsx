import { BsChatHeart } from "react-icons/bs";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
    return (
        <div className="navbar bg-base-300 shadow-sm px-10 py-7">
            <div className="flex-1 flex">
                <a className="btn btn-ghost text-3xl text-yellow-400 border-2 -mx-3">Amble</a>
                <BsChatHeart className="text-2xl text-red-400" />
            </div>
            {user && <div className="flex gap-2">
                <p className="my-auto mr-5 text-lg">Hi, {user.firstName}</p>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar h-16 w-16">
                        <div className="w-20 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default Navbar;