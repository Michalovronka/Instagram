import { FC, useEffect, useState } from "react";
import api from "../../api";

interface Props {
  size: number;
  contentId: string;
  username: string;
  likes: number;
  setLikes: (newLikes: number) => void;
}

const Like: FC<Props> = ({ size, contentId, username, likes, setLikes }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(()=>{
    const checkIsLiked = async() =>{
        setIsLiked(await api.get(`/like/isLiked/${contentId}/${username}`))
    }
    checkIsLiked();
  }, [contentId,username])
  const handleClick = async () => {
    const originalIsLiked = isLiked;
    const originalLikes = likes;
    const newIsLiked = !originalIsLiked;

    setIsLiked(newIsLiked);
    const newLikesCount = newIsLiked ? originalLikes + 1 : originalLikes - 1;
    setLikes(newLikesCount);


    try {
      if (newIsLiked) {
        console.log("creatuju")
        await api.post(`/like/create/${contentId}/${username}`);
      } else {
        await api.delete(`/like/delete/${contentId}/${username}`);
      }
    } catch (error) {
      console.log("shobal")
      setIsLiked(originalIsLiked);
      setLikes(originalLikes);
    }
  };

  return (
    <button onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={size}
        height={size}
        viewBox="0 0 256 256"
        xmlSpace="preserve"
      >
        <g
          transform="translate(1.4066 1.4066) scale(2.81 2.81)"
          style={{
            stroke: "none",
            strokeWidth: 0,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
        >
          <path
            d="M64.44 12.016c5.225 0 10.136 2.035 13.831 5.729 7.626 7.626 7.626 20.035 0 27.662l-19.44 19.44L45 78.677 31.169 64.846l-19.44-19.44c-7.626-7.626-7.626-20.035 0-27.662 3.694-3.694 8.606-5.729 13.831-5.729s10.136 2.035 13.831 5.729l1.367 1.367L45 23.354l4.242-4.242 1.367-1.367c3.695-3.694 8.607-5.729 13.831-5.729zm0-6c-6.541 0-13.083 2.495-18.073 7.486L45 14.869l-1.367-1.367C38.642 8.511 32.101 6.016 25.56 6.016S12.477 8.511 7.486 13.502c-9.982 9.982-9.982 26.165 0 36.147l19.44 19.44L45 87.163l18.073-18.073 19.44-19.44c9.982-9.982 9.982-26.165 0-36.147-4.991-4.991-11.532-7.486-18.073-7.486z"
            fill={isLiked ? "red" : "black"}
            stroke="none"
          />
        </g>
      </svg>
    </button>
  );
};

export default Like;