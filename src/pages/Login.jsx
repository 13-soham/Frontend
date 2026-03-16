import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from "../Redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";

const Login = () => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault(); // prevents page reload
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email : Email , password : Password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center my-15">
      <form
        onSubmit={submitHandler} // submitHandler now triggers correctly
        className="fieldset bg-[#dcbd30] border-base-300 rounded-box w-xs border p-5 flex flex-col gap-4"
      >
        <h2 className="fieldset-legend text-3xl font-extrabold font-[poppins] text-amber-950 mx-auto">
          Login
        </h2>

        {/* Email Field */}
        <label htmlFor="email" className="label text-lg font-[poppins] text-amber-950">
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
        <label htmlFor="password" className="label text-lg font-[poppins] text-amber-950">
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
      </form>
    </div>
  );
};

export default Login;