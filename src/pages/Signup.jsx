import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Step1Field from "../components/Step1Field";
import Step2Field from "../components/Step2Field";
import axios from "axios";
import { BASE_URL } from "../utils/constraints";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/features/userSlice";

const Signup = () => {
  const [Step, setStep] = useState(1);

  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Interest, setInterest] = useState([]);
  const [About, setAbout] = useState("");
  const [PhotoFile, setPhotoFile] = useState(null);   // changed

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    // e.preventDefault(); 

    try {
      const formData = new FormData();  
      formData.append("firstName", Name);
      formData.append("lastName", Surname);
      formData.append("email", Email);
      formData.append("password", Password);
      formData.append("age", Age);
      formData.append("gender", Gender);
      formData.append("about", About);
      Interest.forEach((i) => formData.append("interest", i));
      if (PhotoFile) formData.append("photo", PhotoFile);

      const res = await axios.post(BASE_URL + "/signup", formData, { withCredentials: true });

      toast.success("Profile Created successfully");
      dispatch(addUser(res?.data?.user));
      navigate("/login");

    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div className="flex justify-center my-17">
      {Step == 1 && <Step1Field
        setStep={setStep}
        Name={Name}
        Surname={Surname}
        Email={Email}
        Password={Password}
        setName={setName}
        setSurname={setSurname}
        setEmail={setEmail}
        setPassword={setPassword}
      />}

      {Step == 2 && <Step2Field
        setStep={setStep}
        Age={Age}
        Gender={Gender}
        Interest={Interest}
        About={About}
        setAge={setAge}
        setGender={setGender}
        setInterest={setInterest}
        setAbout={setAbout}
        setPhotoFile={setPhotoFile}    // changed
        handleSubmit={handleSubmit}
      />}
    </div>
  )
}

export default Signup;