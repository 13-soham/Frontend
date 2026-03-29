import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constraints';
import { useDispatch, useSelector } from 'react-redux';
import { addReq, removeReq } from '../Redux/features/pendingReq';

const PendingReq = () => {
    const dispatch = useDispatch();
    const request = useSelector((state) => state.pendingReq);
    async function pendingReq() {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true });
            dispatch(addReq(res?.data?.filteredReq || []));
            console.log(res?.data?.filteredReq || []);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        pendingReq();
    }, []);

    if (!request) return;
    if (request.length === 0) {
        return <h1 className='text-center text-3xl font-bold my-10'>No Pending Request</h1>
    }



    async function userChoice(status, _id) {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );

            dispatch(removeReq(_id));
            console.log(res)
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="my-2 flex flex-col items-center">
            <h1 className='mx-auto text-3xl text-[#fed749] text-center font-bold my-5'>Yo<span className='text-red-400'>u</span>r <span className='text-red-400'>P</span>endi<span className='text-red-400'>n</span>g Reque<span className='text-red-400'>s</span>t</h1>
            <div className="carousel carousel-center bg-base-200 rounded-box w-2xl space-x-8 p-4">

                {/* each card */}
                {request.map((elem) => (
                    <div key={elem._id} className="carousel-item relative">
                        <img
                            src={elem.senderId.photoUrl}
                            className="rounded-box h-96 w-76 object-cover"
                        />
                        {/* name and gender overlay */}
                        <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-3 my-2">
                            <span className="text-white font-bold text-lg bg-black/40 px-2 py-1 rounded-lg">
                                {elem.senderId.firstName[0]}
                            </span>
                            <span className="text-[#dcbd30] font-bold text-sm bg-black/40 px-2 py-1 rounded-lg">
                                {elem.senderId.gender}
                            </span>
                        </div>

                        {/* accept and reject buttons */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4 px-3">
                            <button 
                                onClick={()=>{
                                    userChoice("accepted", elem.senderId._id);
                                }}
                                className="btn btn-md bg-[#dcbd30] text-amber-950 font-bold border-none hover:bg-[#c6a926]">
                                Accept
                            </button>
                            <button
                                onClick={()=>{
                                    userChoice("rejected", elem.senderId._id);
                                }} 
                                className="btn btn-md bg-neutral text-white font-bold border border-[#333] hover:bg-[#1a1a1a]">
                                Reject
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default PendingReq;