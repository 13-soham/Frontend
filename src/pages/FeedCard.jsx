import axios from 'axios';
import { useState } from 'react'
import { BASE_URL } from '../utils/constraints';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../Redux/features/feedSlice';

const FeedCard = ({ user }) => {

    const tempImage = "https://plus.unsplash.com/premium_vector-1682269282372-6d888f3451f1?q=80&w=800";

    const dispatch = useDispatch();
    const [swipe, setSwipe] = useState(null); 

    async function userSwipe(status, userId) {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );

            dispatch(removeUserFeed(userId));
            setSwipe(null);

            console.log(res.data);
        } catch (err) {
            console.log(err.message);
            setSwipe(null);
        }
    }


    return (
        <div className={`relative rounded-3xl overflow-hidden mx-auto my-6 w-full border border-[#222] bg-[#111] h-[65vh] max-h-155 min-h-110 max-w-110 transition-all duration-300
            ${swipe === "right" ? "translate-x-[80%] rotate-12 opacity-0" : ""}
            ${swipe === "left" ? "-translate-x-[80%] -rotate-12 opacity-0" : ""}
        `}>

            {/* Scrollable content */}
            <div className="h-full overflow-y-auto pb-24 [scrollbar-width:none] [-ms-overflow-style:none]">

                {/* SECTION 1 — full-cover image + name overlay */}
                <div className="relative h-[65vh] max-h-155 min-h-110">
                    <img
                        src={user.photoUrl ? user.photoUrl : tempImage}
                        alt={user.firstName}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />

                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

                    {/* Name + age */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-21">
                        <h2
                            className="m-0 leading-tight font-bold text-[#fed749] text-[clamp(1.4rem,4.5vw,1.9rem)] font-montserrat"
                            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
                        >
                            {user.firstName},{' '}
                            <span className="font-light italic text-white">{user.age}</span>
                        </h2>
                        <p className="text-xs mt-1 mb-0 text-white/50">
                            📍 2 km away · scroll for more
                        </p>
                    </div>
                </div>

                {/* SECTION 2 — profile details */}
                <div className="bg-[#111] text-[#f0f0f0] px-6 pt-8 pb-4">

                    {/* First Name */}
                    <div className="mb-5">
                        <p className="text-[0.65rem] tracking-widest text-[#fed749] uppercase mb-1">First Name</p>
                        <p className="text-lg font-semibold m-0 font-montserrat">{user.firstName}</p>
                    </div>
                    <div className="h-px bg-[#222] mb-5" />

                    {/* Last Name */}
                    <div className="mb-5">
                        <p className="text-[0.65rem] tracking-widest text-[#fed749] uppercase mb-1">Last Name</p>
                        <p className="text-lg font-semibold m-0 font-montserrat">{user.lastName}</p>
                    </div>
                    <div className="h-px bg-[#222] mb-5" />

                    {/* About */}
                    <div className="mb-5">
                        <p className="text-[0.65rem] tracking-widest text-[#fed749] uppercase mb-2">About</p>
                        <p className="text-sm text-[#bbb] leading-relaxed m-0">
                            {user.about ? user.about : "Hi, nice to meet you!"}
                        </p>
                    </div>
                    <div className="h-px bg-[#222] mb-5" />

                    {/* Gender */}
                    <div className="mb-5">
                        <p className="text-[0.65rem] tracking-widest text-[#fed749] uppercase mb-1">Gender</p>
                        <p className="text-base text-[#f0f0f0] m-0">{user.gender}</p>
                    </div>
                    <div className="h-px bg-[#222] mb-5" />

                    {/* Interests */}
                    <div>
                        <p className="text-[0.65rem] tracking-widest text-[#fed749] uppercase mb-3">Interests</p>
                        <div className="flex flex-wrap gap-2">
                            {user.interest.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-[#1a1a1a] border border-[#fed749] text-[#fed749] rounded-full px-4 py-1 text-xs font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky 2-button bar */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-8 px-6 pt-3 pb-5 z-10 bg-linear-to-t from-[#111] via-[#111]/80 to-transparent">
                <button
                    onClick={()=>{
                        setSwipe("left"); 
                        setTimeout(() => userSwipe("ignored", user._id), 300);  
                    }}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1a1a1a] border-2 border-[#333] text-white text-[1.3rem] cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    aria-label="Ignore"
                >
                    ✕
                </button>

                <button
                    onClick={()=>{
                        setSwipe("right"); 
                        setTimeout(() => userSwipe("interested", user._id), 300); 
                    }}
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-[#fed749] text-[#111] text-[1.6rem] cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-[0_0_24px_rgba(254,215,73,0.3)]"
                    aria-label="Like"
                >
                    ♥
                </button>
            </div>
        </div>
    )
}

export default FeedCard;