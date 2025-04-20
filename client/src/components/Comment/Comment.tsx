import { FC, useEffect, useState } from "react";
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

interface Props {
  commentId: string;
  username: string;
  replyId: (commentId: string) => void;
  replyToReply?: string;
  numberOfReplies?: number;
}

const Comment: FC<Props> = ({ commentId, username, replyId, replyToReply, numberOfReplies }) => {
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(true);
  const [commentData, setCommentData] = useState<CommentData>();
  const [likes, setLikes] = useState<number>(0);
  const [replies, setReplies] = useState<string[]>([]);
  const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false);

  useEffect(()=>{
    getReplies();
  },[numberOfReplies])

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

  const getReplies = async () => {
    try {
      setReplies(await api.get(`comment/allOnContent/${commentId}`));
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      };
      console.error(error || "Error loading Comment");
    }
  };
  
  if (isCommentLoading) return <> Loading...</>;
  if (!commentData) return <>Error Loading comment</>;

  return (
    <>
      <div className={`flex ${replies.length >0 ? "my-3" : "my-5"} w-full items-start`}>
        <div className="flex flex-grow">
          <Link to={`/${commentData.username}`} className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full object-cover bg-blue-800"
              src={commentData.userPfp}
              alt="Profile"
            />
          </Link>
          <div className="ml-4 overflow-hidden flex-1">
            <Link
              to={`/${commentData.username}`}
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
              <div className="font-medium text-slate-500">{likes} likes</div>
              <button
                onClick={() => replyId(replyToReply ? replyToReply : commentId)}
                className="font-medium text-slate-500"
              >
                Reply
              </button>
            </div>

            {replies.length > 0 &&
            <button
              onClick={() => setIsRepliesOpen(!isRepliesOpen)}
              className="mt-3 text-xs font-medium text-slate-500"
            >
              {isRepliesOpen ? "Close Replies" : "View Replies"}
            </button>}
          </div>
        </div>
        <Like
          size={10}
          contentId={commentId}
          username={username}
          likes={likes}
          setLikes={setLikes}
        />
      </div>
      {isRepliesOpen && (
        <div className="text-sm ml-10">
          {replies &&
            replies.map((reply: string) => (
              <Comment
                key={reply}
                commentId={reply}
                username={username}
                replyId={replyId}
                replyToReply={commentId}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Comment;
