import { useDispatch, useSelector } from 'react-redux';
import { BsChatDots } from "react-icons/bs";
import axios from 'axios';
import { BASE_URL } from '../utils/constraints';
import { useEffect } from 'react';
import { addConnections, deleteConnections } from '../Redux/features/connections';
import { RxCross2 } from "react-icons/rx";


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);

    async function matchedConnections() {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data?.finalConnections));
            // console.log(res?.data?.finalConnections);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        matchedConnections();
    }, []);

    if(!connections) return;

    if(connections.length === 0){
        return <h1 className='text-center text-3xl font-bold my-10'>No matches Yet</h1>
    }

    return (
        <div className='px-50'>
            <h1 className='mx-auto text-3xl text-[#fed749] text-center font-bold my-5'>Yo<span className='text-red-400'>u</span>r <span className='text-red-400'>C</span>onnections</h1>
            <ul className="list bg-base-200 max-h-[60vh] px-5 py-3 overflow-auto scrollbar-hide rounded-box shadow-md">
                {Connections && connections.map((elem) => {
                    const { firstName, lastName, age, gender, about, _id, photoUrl } = elem;

                    return <div key={_id}>
                        <li className="list-row">
                            <div><img className="size-20 rounded-box" src={photoUrl} /></div>
                            <div>
                                <h1 className='text-2xl'>{firstName}, {lastName}</h1>
                                <div className="text-sm capitalize font-semibold opacity-60">{age}, {gender}</div>
                            </div>
                            {about && <p className="list-col-wrap text-xs text-[#fed749]">
                                {about}
                            </p>}
                            <button className="btn btn-square btn-ghost text-3xl hover:bg-base-100">
                                <BsChatDots className='text-red-300' />
                            </button>
                            {/* <button onClick={()=>{
                                dispatch(deleteConnections(_id))
                            }} className="btn btn-square btn-ghost text-xl hover:bg-base-100">
                                <RxCross2 className='text-red-500' />
                            </button> */}
                        </li>
                        <div className="h-1 bg-[#222]" />
                    </div>
                })}
            </ul>
        </div>
    )
}

export default Connections;