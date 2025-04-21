import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import api from "../../api";
import { formatDistance } from "date-fns";
import Like from "../Like/Like";
import Saved from "../Saved/Saved";

interface ProfileUploadProps {
  name?: string;
  pfpSrc?: string;
  uploadId: string;
  loggedInUserUsername: string;
  type: "MainPage" | "Profile";
}

export interface UploadDataType {
  uploadedBy: string;
  contentSrc: string;
  description: string;
  dateOfCreation: string;
  numberOfComments: number;
  numberOfLikes: number;
}

export default function Upload({
  name,
  pfpSrc,
  uploadId,
  loggedInUserUsername,
  type,
}: ProfileUploadProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [uploadData, setUploadData] = useState<UploadDataType>();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>();
  const [likes, setLikes] = useState<number>(0);
  const [commentTargetId, setCommentTargetId] = useState<string>(uploadId);
  const [numberOfReplies, setNumberOfReplies] = useState<number>(0);

  const [mainPageUserData, setMainPageUserData] = useState<{
    userName: string;
    pfpSrc: string;
  }>({ userName: "", pfpSrc: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      if (type === "MainPage" && uploadData)
        setMainPageUserData(
          await api.get(`/user/getById/${uploadData.uploadedBy}`)
        );
    };
    getUserInfo();
  }, [uploadData]);

  useEffect(() => {
    setIsUploadLoading(true);
    const getUploadData = async () => {
      try {
        const response = await api.get(`/upload/${uploadId}`);
        const data: UploadDataType = response as any;
        setUploadData(data);
        setLikes(data.numberOfLikes);
        console.log("eee");
      } catch (err: unknown) {
        const error = err as {
          message?: string;
        };
        setErrorMessage(error.message || "Error while Loading a Upload");
      }
    };
    getUploadData();
    setIsUploadLoading(false);
  }, [uploadId]);

  useEffect(() => {
    if (isUploadOpen) {
      document.body.classList.add("overflow-hidden");

      const getComments = async () => {
        try {
          setComments(await api.get(`comment/allOnContent/${uploadId}`));
        } catch (err: unknown) {
          const error = err as {
            message?: string;
          };
          setErrorMessage(error.message || "Error while Loading a Upload");
        }
      };
      if (!comments) {
        getComments();
      }
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isUploadOpen]);

  useEffect(() => {
    if (errorMessage) console.log(errorMessage);
  }, [errorMessage]);

  const postForm = async () => {
    if (!commentText || !commentTargetId || !loggedInUserUsername) {
      setErrorMessage("Error while making upload");
      return;
    }
    
    try {
      const newComment = await api.post("comment/create", {
        text: commentText,
        commentOnId: commentTargetId,
        commentedBy: loggedInUserUsername,
      });
      if (commentTargetId === uploadId) comments?.push(newComment);
      else setNumberOfReplies(numberOfReplies + 1);
      setCommentText("");
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.log(error);
      setErrorMessage(error.message || "Comment upload failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handlePost = (e: React.FormEvent) => {
    if (!loggedInUserUsername) navigate("/");
    e.preventDefault();
    postForm();
  };

  if (isUploadLoading) return <>Loading...</>;
  if (!uploadData) return <>Cant find upload</>;

  return (
    <>
      {type === "MainPage" ? (
        <>
          <div className="justify-center mx-2 my-3 | md:w-main-content-posts">
            <div className="flex items-center">
              <img
                src={mainPageUserData.pfpSrc}
                className="w-12 rounded-full p-2"
                alt="no img"
              />
              <Link
                to={`/${mainPageUserData.userName}`}
                className="text-sm font-medium"
              >
                {mainPageUserData.userName}
              </Link>
            </div>

            <div className="flex flex-col rounded-md items-center justify-center h-[520px] bg-black">
              <img
                src={uploadData.contentSrc}
               
              ></img>
            </div>

            <div className="text-sm border-b border-b-slate-300">
              <div className="flex gap-5 py-3">
                <Like
                  size={25}
                  contentId={uploadId}
                  username={loggedInUserUsername}
                  likes={likes}
                  setLikes={setLikes}
                />
                <button className="" onClick={() => setIsUploadOpen(true)}>
                  e
                </button>
                <div className="flex-grow"></div>
                <div className="flex justify-end">
                  <Saved
                    size={25}
                    contentId={uploadId}
                    username={loggedInUserUsername}
                  />
                </div>
              </div>
              <div className="font-medium">{likes} likes</div>
              <div className="my-1">
                <Link
                  to={`/${mainPageUserData.userName}`}
                  className="font-medium"
                >
                  {mainPageUserData.userName}
                </Link>{" "}
                {uploadData.description}
              </div>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="text-slate-500"
              >
                View all comments
              </button>
              <form onSubmit={handlePost} className="flex w-full items-center">
                <textarea
                  name="Comment"
                  required
                  placeholder="Add a comment..."
                  onChange={handleChange}
                  value={commentText}
                  className="w-full text-sm outline-none mt-2 resize-none align-middle"
                />

                {commentText.length > 0 && commentText.length <= 200 &&
                  <button
                    onClick={handlePost}
                    className="ml-2 p-3 text-sky-400 hover:text-blue-800 font-medium text-sm"
                  >
                    Post
                  </button>
                 }
              </form>
              {/*Make this a form for comment */}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[25rem] bg-gray-100">
          <img
            src={uploadData.contentSrc}
            onClick={() => setIsUploadOpen(true)}
            className="max-h-[25rem] hover:brightness-50 hover:cursor-pointer active:opacity-60 active:brightness-100"
          />
        </div>
      )}

      {isUploadOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={() => setIsUploadOpen(false)}
            className="absolute top-0 right-0 mt-3 mr-5 text-xl text-white"
          >
            X
          </button>
          <div className="bg-transparent max-md:w-[90%] max-md:h-[80%] w-[70%] h-[95%] relative">
            <div className="flex h-full items-stretch">
              <div className="w-1/2 flex items-center justify-center h-full bg-black">
                <img
                  className="w-full h-full object-contain"
                  src={uploadData.contentSrc}
                  alt="Profile"
                />
              </div>

              <div className="w-1/2 bg-white flex flex-col h-full relative">
                <div className="p-4 flex justify-between border-b font-medium text-sm border-slate-300 w-full">
                  <Link
                    to={`/${name || mainPageUserData.userName}`}
                    className="flex items-center"
                  >
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={pfpSrc || mainPageUserData.pfpSrc}
                      alt="Profile"
                    />
                    <div className="text-center ml-4 hover:text-gray-400">
                      {name || mainPageUserData.userName}
                    </div>
                  </Link>
                  <button className="font-bold">...</button>
                </div>

                <div className="flex-1 overflow-y-auto pb-32">
                  <div className="p-4">
                    <div className="flex flex-col">
                      <div className="flex">
                        <Link
                          to={`/${name || mainPageUserData.userName}`}
                          className="flex-shrink-0"
                        >
                          <img
                            className="w-8 h-8 rounded-full object-cover bg-blue-800"
                            src={pfpSrc || mainPageUserData.pfpSrc}
                            alt="Profile"
                          />
                        </Link>
                        <div className="ml-4 overflow-hidden">
                          <Link
                            to={`/${name || mainPageUserData.userName}`}
                            className="float-left mr-2 font-medium text-sm hover:text-slate-400"
                          >
                            {name || mainPageUserData.userName}
                          </Link>
                          <div className="text-sm mt-0.5">
                            {uploadData.description}
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            {formatDistance(
                              new Date(uploadData.dateOfCreation),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4">
                    {comments &&
                      comments.map((comment: string) => (
                        <Comment
                          key={comment}
                          commentId={comment}
                          username={loggedInUserUsername}
                          replyId={setCommentTargetId}
                          numberOfReplies={numberOfReplies}
                        />
                      ))}
                  </div>
                </div>

                <div className=" bottom-0 left-0 right-0 h-40  bg-white border-t border-slate-300">
                  <div className="p-4">
                    <div className="flex flex-row pb-2">
                      <div className="flex justify-start">
                        <Like
                          size={20}
                          contentId={uploadId}
                          username={loggedInUserUsername}
                          likes={likes}
                          setLikes={setLikes}
                        />
                      </div>
                      <div className="flex-grow"></div>
                      <div className="flex justify-end">
                        <Saved
                          size={20}
                          contentId={uploadId}
                          username={loggedInUserUsername}
                        />
                      </div>
                    </div>
                    <p className="text-sm">{likes} likes</p>
                    <p className="text-xs">
                      {formatDistance(
                        new Date(uploadData.dateOfCreation),
                        new Date(),
                        { addSuffix: true }
                      )}
                    </p>
                  </div>

                  <div className="border-t w-full flex items-center">
                    <form
                      onSubmit={handlePost}
                      className="flex w-full items-center"
                    >
                      <textarea
                        name="Comment"
                        required
                        placeholder="Add a comment..."
                        onChange={handleChange}
                        value={commentText}
                        className="w-full text-sm outline-none pt-4 px-3 resize-none align-middle"
                      />

                      {commentText.length > 0 && commentText.length <= 200 ? (
                        <button
                          onClick={handlePost}
                          className="ml-2 p-3 text-sky-400 hover:text-blue-800 font-medium text-sm"
                        >
                          Post
                        </button>
                      ) : (
                        <div className="ml-2 p-3 font-medium text-sm text-sky-200">
                          Post
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
