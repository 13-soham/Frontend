import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constraints';
import { storeUser } from '../Redux/features/feedSlice';
import FeedCard from './FeedCard';
import { useEffect } from 'react';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  async function handleFeed(){
    if(feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials : true });
      dispatch(storeUser(res.data.feedUsers));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(()=>{
    handleFeed();
  }, []);

  console.log(feedData)

  return (
    <div>
      { feedData && <FeedCard user={feedData[0]}/> }
    </div>
  )
}

export default Feed;