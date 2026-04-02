import axios from "axios";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addUser } from "../Redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";
// import { BsFillHeartbreakFill } from "react-icons/bs";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault(); // prevents page reload
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email: Email, password: Password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
      toast.error(err?.response?.data?.message || "something went wrong");
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center my-17">
      <form
        onSubmit={submitHandler} // submitHandler now triggers correctly
        className="fieldset bg-[#dcbd30] border-base-300 rounded-box w-xs border pt-7 pb-7 p-5 flex flex-col gap-4"
      >
        <h2 className="fieldset-legend text-3xl font-extrabold font-[poppins] text-amber-950 mx-auto">
          Login
        </h2>

        {/* Email Field */}
        <label htmlFor="email" className="label text-lg font-[poppins] font-bold text-amber-950">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input focus:outline-none focus:ring-0 focus:ring-offset-0"
          required
        />

        {/* Password Field */}
        <label htmlFor="password" className="label text-lg font-[poppins] font-bold text-amber-950">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input focus:outline-none focus:ring-0 focus:ring-offset-0"
          required
        />

        {/* Submit Button */}
        <button
          type="submit" // ensures form submit triggers submitHandler
          className="btn btn-neutral h-13 mt-4 text-lg"
        >
          Login
        </button>
        <p className="text-[14px] font-bold text-black mx-auto">New Here? <Link to="/signup" className="text-blue-700 text-lg underline">Signup</Link> </p>
      </form>
    </div>
  );
};

export default Login;