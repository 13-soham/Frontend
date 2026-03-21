import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Step1Field = ({ setStep, Name, Surname, Email, Password, setName, setSurname, setEmail, setPassword }) => {
    return (
        <>
            <div
                className="fieldset max-h-[60vh] overflow-y-auto scrollbar-hide bg-[#dcbd30] border-base-300 rounded-box w-xs border pt-7 pb-7 p-5 flex flex-col gap-4"
            >
                <h2 className="fieldset-legend text-3xl font-extrabold font-[poppins] text-amber-950 mx-auto">
                    Signup
                </h2>

                {/* Name Field */}
                <label htmlFor="text" className="label text-lg font-[poppins] font-bold text-amber-950">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={Name}
                    onChange={(e)=> setName(e.target.value)}
                    className="input focus:outline-none focus:ring-0 focus:ring-offset-0 text-lg px-2 py-5"
                    required
                />

                {/* Surname Field */}
                <label htmlFor="text" className="label text-lg font-[poppins] font-bold text-amber-950">
                    Surname
                </label>
                <input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder="Surname"
                    value={Surname}
                    onChange={(e)=> setSurname(e.target.value)}
                    className="input focus:outline-none focus:ring-0 focus:ring-offset-0 text-lg px-2 py-5"
                />

                {/* Email Field */}
                <label htmlFor="email" className="label text-lg font-[poppins] font-bold text-amber-950">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input focus:outline-none focus:ring-0 focus:ring-offset-0 text-lg px-2 py-5"
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
                    placeholder="Password"
                    value={Password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="input focus:outline-none focus:ring-0 focus:ring-offset-0 text-lg px-2 py-5"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit" // ensures form submit triggers submitHandler
                    onClick={()=> {
                        if(!Name.trim() || !Email.trim() || !Password.trim()){
                            toast.error("Please fill the necessary fields");
                        }
                        else{
                            setStep(2);
                        }
                    }}
                    className="btn btn-neutral h-13 mt-4 text-lg"
                >
                    Next
                </button>
                <p className="text-[14px] font-bold text-black mx-auto">Already registered? <Link to="/login" className="text-blue-700 text-lg underline">Login</Link> </p>
            </div>
        </>
    )
}

export default Step1Field;