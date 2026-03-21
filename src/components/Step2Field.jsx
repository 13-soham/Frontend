import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Step2Field = ({ setStep, Age, Gender, Interest, About, setAge, setGender, setInterest, setAbout, handleSubmit, setPhotoFile}) => {
    return (
        <>
            <div
                className="fieldset  max-h-[60vh] overflow-y-auto scrollbar-hide bg-[#dcbd30] border-base-300 rounded-box w-xs border pt-7 pb-7 p-5 flex flex-col gap-4"
            >
                <h2 className="fieldset-legend text-3xl font-extrabold font-[poppins] text-amber-950 mx-auto">
                    Let's Finish
                </h2>

                {/* 1. Profile Photo */}
                <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-widest text-amber-950 font-bold uppercase">Profile Photo</label>
                    <input
                        type="file"
                        onChange={(e) => setPhotoFile(e.target.files[0])}
                        className="file-input file-input-bordered w-full focus:outline-none outline-none bg-[#1a1a1a] border-[#333] text-white"
                        accept="image/*"
                    />
                    {/* {uploading && <span className="text-xs text-[#fed749] mt-1">Uploading... ⏳</span>} */}
                </div>

                {/* 2. Age */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <label className="text-[0.65rem] font-bold tracking-widest text-amber-950 uppercase">Age</label>
                        <span className="text-sm font-bold text-black">{Age} years old</span>
                    </div>
                    <input
                        type="range"
                        min="18"
                        max="80"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        className="range range-neutral range-sm"
                    />
                    <div className="flex justify-between text-[#1b1b1b] text-xs px-1">
                        <span>18</span>
                        <span>80</span>
                    </div>
                </div>


                {/* 3. Gender */}
                <div className="flex flex-col gap-3">
                    <label className="text-[0.65rem] tracking-widest text-amber-950 font-bold uppercase">Gender</label>
                    <div className="flex gap-3">
                        {['male', 'female', 'others'].map((g) => (
                            <label
                                key={g}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all capitalize text-sm font-medium
                                    ${Gender === g
                                        ? 'border-2 border-amber-950 bg-[#c6a926]  text-amber-950 font-bold'
                                        : 'border-2 border-[#333] text-[#666] hover:border-[#555]'
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


                {/* 4. Interests */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <label className="text-[0.65rem] tracking-widest text-amber-950 font-bold uppercase">Interests</label>
                        <span className="text-xs text-[#1d1d1d]">{Interest.length}/10</span>
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


                {/* 5. About */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <label className="text-[0.65rem] tracking-widest text-amber-950 font-bold uppercase">About Me</label>
                        <span className={`text-xs ${About.length > 200 ? 'text-red-500' : 'text-[#272727]'}`}>
                            {About.length}/200
                        </span>
                    </div>
                    <textarea
                        value={About}
                        onChange={(e) => {
                            if (e.target.value.length > 201) {
                                toast.warn("About cannot exceed 200 characters!");
                                return;
                            }
                            setAbout(e.target.value)
                        }}
                        className="w-full h-28 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#fed749] resize-none transition-colors"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit" // ensures form submit triggers submitHandler
                    onClick={() => handleSubmit()}
                    className="btn btn-neutral h-13 mt-4 text-lg"
                >
                    Submit
                </button>
                <p onClick={()=> setStep(1)} className="text-[14px] font-bold text-indigo-800 underline mx-auto cursor-pointer">Go back and update</p>
            </div>
        </>
    )
}

export default Step2Field