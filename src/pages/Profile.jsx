import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constraints';
import { toast } from "react-toastify";
import { addUser } from '../Redux/features/userSlice';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Interest, setInterest] = useState([]);
  const [About, setAbout] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState("");
  const [uploading, setuploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setAge(user.age || "");
    setAbout(user.about || "");
    setGender(user.gender || "");
    setInterest(user.interest || []);
    setPhotoUrl(user.photoUrl || "");
  }, [user]);

  if (!user) return (
    <div className="flex justify-center items-center h-[60vh]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  async function handlePhotoUpload(e) {
    const files = e.target.files[0];
    if (!files) return;
    const formData = new FormData();
    formData.append("photo", files);
    try {
      setuploading(true);
      const res = await axios.post(BASE_URL + "/profile/uploadPhoto", formData, { withCredentials: true });
      setPhotoUrl(res?.data?.photoUrl);
    } catch (err) {
      console.log(err.message);
    } finally {
      setuploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        age: Age,
        gender: Gender,
        interest: Interest,
        about: About,
        photoUrl: PhotoUrl
      }, { withCredentials: true });

      toast.success("profile saved successfully.");
      dispatch(addUser(res?.data?.updateUser));
      
    } catch (err) {
      toast.error("something went wrong");
    }
  }

  return (
    <div className='flex justify-center gap-10 px-6 py-8 flex-wrap'>

      {/* Preview Card */}
      <div
        className="self-start rounded-3xl overflow-hidden border border-[#222]"
        style={{ width: '280px', background: '#111' }}
      >
        {/* Photo */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src={PhotoUrl || "https://plus.unsplash.com/premium_vector-1682269282372-6d888f3451f1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="picture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-3">
          {/* Name + Age + Gender */}
          <div>
            <h1 className="text-lg font-bold text-[#fed749] font-['Georgia',serif]">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-white/60 mt-1">{Age} years old · {Gender}</p>
          </div>

          {/* About */}
          {About && (
            <p className="text-xs text-[#bbb] leading-relaxed line-clamp-3">{About}</p>
          )}

          {/* Interests */}
          {Interest.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {Interest.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#1a1a1a] border border-[#fed749] text-[#fed749] rounded-full px-3 py-0.5 text-[0.65rem] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={(e) => { handleSubmit(e); }}
        className="fieldset bg-base-300 border-base-300 rounded-box w-full max-w-md border p-6"
      >
        <div className="fieldset-legend text-xl font-bold">Change Profile</div>

        {/* Scrollable area */}
        <div className="overflow-y-auto max-h-[50vh] pr-2 flex flex-col gap-4">

          {/* 1. Profile Photo */}
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Profile Photo</span></div>
            <input
              onChange={handlePhotoUpload}
              type="file"
              className="file-input file-input-bordered w-full focus:outline-none outline-none"
              accept="image/*"
            />
            {uploading && <span className="text-xs text-primary mt-1">Uploading... ⏳</span>}
          </label>

          {/* 2. Age */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Age</span>
              <span className="label-text-alt font-mono font-bold text-primary">
                {Age} years old
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="80"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              className="range range-primary range-sm"
            />
          </label>

          {/* 3. Gender */}
          <div className="form-control">
            <div className="label"><span className="label-text">Gender</span></div>
            <div className="flex gap-4">
              {['male', 'female', 'others'].map((g) => (
                <label key={g} className="label cursor-pointer gap-2">
                  <input type="radio" onChange={(e) => setGender(e.target.value)} checked={g === Gender} value={g} name="gender" className="radio radio-primary" />
                  <span className="label-text">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Interests */}
          <div className="form-control">
            <div className="label"><span className="label-text">Interests</span></div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-base-100 rounded-lg border border-base-content/10">
              {[
                "Reading", "travel", "Cooking", "Hiking", "Photography",
                "Gaming", "Gardening", "Painting", "Music", "Fitness",
                "sleep", "Dancing", "Fishing", "Yoga", "Cycling",
                "Knitting", "Camping", "marry", "Swimming", "Chess",
                "Singing", "Movies", "Podcasts", "Surfing", "Woodworking",
                "Meditation", "Birdwatching", "Origami", "csk", "love"
              ].map((elem) => (
                <label key={elem} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox"
                    checked={Interest.includes(elem)}
                    value={elem}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInterest([...Interest, elem]);
                      } else {
                        setInterest(Interest.filter((i) => i !== elem));
                      }
                    }}
                    className="checkbox checkbox-xs checkbox-primary"
                  />
                  <span className="text-xs">{elem}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. About */}
          <label className="form-control">
            <div className="label"><span className="label-text">About Me</span></div>
            <textarea value={About} onChange={(e) => setAbout(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Tell us about yourself..."></textarea>
          </label>

          <button type="submit" className="btn btn-primary w-full mt-4">Save Profile</button>

        </div>
      </form>

    </div>
  )
}

export default Profile;