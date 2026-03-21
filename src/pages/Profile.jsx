import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constraints';
import { toast } from "react-toastify";
import { addUser } from '../Redux/features/userSlice';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      toast.error("something went wrong");
    }
  }

  return (
    <div className='flex justify-center gap-15 px-6 py-8 flex-wrap'>

      {/* Preview Card */}
      <div className="self-start rounded-3xl overflow-hidden border border-[#222] bg-base-300" style={{ width: '320px' }}>
        <div className="w-full h-72 overflow-hidden">
          <img
            src={PhotoUrl || "https://plus.unsplash.com/premium_vector-1682269282372-6d888f3451f1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="picture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div>
            <h1 className="text-lg font-bold text-[#fed749] font-['Georgia',serif]">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-white/60 mt-1">{Age} years old · {Gender}</p>
          </div>
          {About && (
            <p className="text-xs text-[#bbb] leading-relaxed line-clamp-3">{About}</p>
          )}
          {Interest.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {Interest.map((tag) => (
                <span key={tag} className="bg-[#1a1a1a] border border-[#fed749] text-[#fed749] rounded-full px-3 py-0.5 text-[0.65rem] font-medium">
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
        className="rounded-3xl border border-[#222] bg-base-300 w-full max-w-md p-6"
      >
        <h2 className="text-xl font-bold text-[#fed749] font-['Georgia',serif] mb-4">
          Edit Profile
        </h2>

        {/* Scrollable area */}
        <div className="overflow-y-auto max-h-[50vh] pr-2 flex flex-col gap-6">

          {/* 1. Profile Photo */}
          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-widest text-[#fed749] uppercase">Profile Photo</label>
            <input
              onChange={handlePhotoUpload}
              type="file"
              className="file-input file-input-bordered w-full focus:outline-none outline-none bg-[#1a1a1a] border-[#333] text-white"
              accept="image/*"
            />
            {uploading && <span className="text-xs text-[#fed749] mt-1">Uploading... ⏳</span>}
          </div>

          <div className="h-px bg-[#222]" />

          {/* 2. Age */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-[0.65rem] tracking-widest text-[#fed749] uppercase">Age</label>
              <span className="text-sm font-bold text-[#fed749]">{Age} years old</span>
            </div>
            <input
              type="range"
              min="18"
              max="80"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              className="range range-primary range-sm"
            />
            <div className="flex justify-between text-[#555] text-xs px-1">
              <span>18</span>
              <span>80</span>
            </div>
          </div>

          <div className="h-px bg-[#222]" />

          {/* 3. Gender */}
          <div className="flex flex-col gap-3">
            <label className="text-[0.65rem] tracking-widest text-[#fed749] uppercase">Gender</label>
            <div className="flex gap-3">
              {['male', 'female', 'others'].map((g) => (
                <label
                  key={g}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all capitalize text-sm font-medium
                    ${Gender === g
                      ? 'border-[#fed749] bg-[#fed749]/10 text-[#fed749]'
                      : 'border-[#333] text-[#666] hover:border-[#555]'
                    }`}
                >
                  <input
                    type="radio"
                    onChange={(e) => setGender(e.target.value)}
                    checked={g === Gender}
                    value={g}
                    name="gender"
                    className="hidden"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#222]" />

          {/* 4. Interests */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-[0.65rem] tracking-widest text-[#fed749] uppercase">Interests</label>
              <span className="text-xs text-[#555]">{Interest.length}/10</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-[#1a1a1a] rounded-xl border border-[#222]">
              {[
                "ipl", "travel", "cooking", "cricket", "photography",
                "gaming", "gardening", "painting", "music", "fitness",
                "sleep", "dancing", "movie", "yoga", "laughing",
                "coding", "Gen-Z", "marry", "swimming", "chess",
                "singing", "chelsea", "gossip", "love", "fighting",
                "business", "studying", "farming", "csk", "football", "anime", "others"
              ].map((elem) => (
                <label
                  key={elem}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all text-xs
                    ${Interest.includes(elem)
                      ? 'bg-[#fed749]/10 text-[#fed749]'
                      : Interest.length >= 10
                        ? 'opacity-30 cursor-not-allowed text-[#555]'
                        : 'text-[#888] hover:text-white'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={Interest.includes(elem)}
                    value={elem}
                    disabled={Interest.length >= 10 && !Interest.includes(elem)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (Interest.length >= 10) {
                          toast.warn("You can select maximum 10 interests!");
                          return;
                        }
                        setInterest([...Interest, elem]);
                      } else {
                        setInterest(Interest.filter((i) => i !== elem));
                      }
                    }}
                    className="checkbox checkbox-xs checkbox-primary"
                  />
                  {elem}
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#222]" />

          {/* 5. About */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-[0.65rem] tracking-widest text-[#fed749] uppercase">About Me</label>
              <span className={`text-xs ${About.length > 200 ? 'text-red-400' : 'text-[#555]'}`}>
                {About.length}/200
              </span>
            </div>
            <textarea
              value={About}
              onChange={(e) => {
                if (e.target.value.length > 200) {
                  toast.warn("About cannot exceed 200 characters!");
                  return;
                }
                setAbout(e.target.value)
              }}
              className="w-full h-28 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#fed749] resize-none transition-colors"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-[#fed749] text-[#111] font-bold text-sm tracking-wide hover:bg-[#f5cc30] transition-colors active:scale-95 cursor-pointer">
            Save Profile
          </button>

        </div>
      </form>

    </div>
  )
}

export default Profile;