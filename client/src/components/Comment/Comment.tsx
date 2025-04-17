import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { formatDistance } from "date-fns";
import Like from "../Like/Like";

interface CommentData {
  username: string;
  userPfp: string;
  text: string;
  dateOfCreation: string;
  numberOfLikes: number;
}

export default function Comment({ commentId }: { commentId: string }) {
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(true);
  const [commentData, setCommentData] = useState<CommentData>();
  const [likes, setLikes] = useState<number>(0);
    
  useEffect(() => {
    const getCommentData = async () => {
      try {
        const response = await api.get(`/comment/${commentId}`);
        const data: CommentData = response as any;
        setCommentData(data);
        setLikes(data.numberOfLikes);
      } catch (err: unknown) {
        const error = err as {
          message?: string;
        };
        console.error(error || "Error loading Comment");
      }
    };
    getCommentData();
    setIsCommentLoading(false);
  }, [commentId]);

  if (isCommentLoading) return <> Loading...</>;
  if (!commentData) return <>Error Loading comment</>;

  return (
    <div className="flex my-4 w-full items-start">
      <div className="flex flex-grow">
        <Link to="/" className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full object-cover bg-blue-800"
            src={commentData.userPfp}
            alt="Profile"
          />
        </Link>
        <div className="ml-4 overflow-hidden flex-1">
          <Link
            to="/"
            className="float-left mr-2 font-medium text-sm hover:text-slate-400"
          >
            {commentData.username}
          </Link>
          <div className="text-sm pr-6">{commentData.text}</div>
          <div className="flex mt-1 text-xs gap-2 clear-left">
            <div className="text-slate-400">
              {formatDistance(
                new Date(commentData.dateOfCreation),
                new Date(),
                { addSuffix: true }
              )}
            </div>
            <div className="font-medium text-slate-500">
              {likes} likes
            </div>
            <button className="font-medium text-slate-500">Reply</button>
          </div>

          <button className="mt-3 text-xs font-medium text-slate-500">
            View Replies
          </button>
        </div>
      </div>
      <Like size={10} contentId={commentId} username={commentData.username} likes={likes} setLikes={setLikes} />
    </div>
  );
}
