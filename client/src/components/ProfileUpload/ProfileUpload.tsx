  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import Comment from "../Comment/Comment";
  import api from "../../api";
  import { formatDistance } from "date-fns";
import Like from "../Like/Like";

  interface ProfileUploadProps {
    name: string;
    pfpSrc: string;
    uploadId: string;
  }

  export interface UploadDataType {
    contentSrc: string;
    description: string;
    dateOfCreation: string;
    numberOfComments: number;
    numberOfLikes: number;
  }

  export default function ProfileUpload({
    name,
    pfpSrc,
    uploadId,
  }: ProfileUploadProps) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [commentText, setCommentText] = useState<string>("");
    const [uploadData, setUploadData] = useState<UploadDataType>();
    const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
    const [comments, setComments] = useState<any[]>();
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
      setIsUploadLoading(true);
      const getUploadData = async () => {
        try {
          const response = await api.get(`/upload/${uploadId}`);
          const data: UploadDataType = response as any;
          setUploadData(data);
          setLikes(data.numberOfLikes)
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
            setComments(await api.get(`comment/allOnUpload/${uploadId}`));
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
      if(errorMessage)console.log(errorMessage);
    }, [errorMessage]);

    const postForm = async () => {
      if (!commentText || !uploadId || !name) {
        setErrorMessage("Error while making upload");
        return;
      }
      try {
        const newComment = await api.post("comment/create", {
          text: commentText,
          commentOnId: uploadId,
          commentedBy: name,
        });
        comments?.push(newComment)
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
      e.preventDefault();
      postForm();
    };

    if (isUploadLoading) return <>Loading...</>;
    if (!uploadData) return <>"Cant find upload"</>;

    return (
      <div className="flex flex-col items-center justify-center h-[25rem]  bg-gray-50 ">
        <img
          src={uploadData.contentSrc}
          onClick={() => {
            setIsUploadOpen(true);
          }}
          className="max-h-[25rem] hover:brightness-50 hover:cursor-pointer active:opacity-60 active:brightness-100 text-white "
        />

        {isUploadOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-0 right-0 mt-
              mr-5 text-xl text-white"
            >
              X
            </button>
            <div className="bg-transparent max-sm:w-full max-sm:h-full w-[70%] h-[95%] relative">
              <div className="flex h-full items-stretch">
                <div className="w-1/2 flex items-center justify-center h-full bg-black">
                  <img
                    className="w-full h-full object-cover"
                    src={uploadData.contentSrc}
                    alt="Profile"
                  />
                </div>

                <div className="w-1/2 bg-white flex flex-col h-full relative">
                  <div className="p-4 flex justify-between border-b font-medium text-sm border-slate-300 w-full">
                    <Link to={`/`} className="flex items-center">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={pfpSrc}
                        alt="Profile"
                      />
                      <div className="text-center ml-4 hover:text-gray-400">
                        {name}
                      </div>
                    </Link>
                    <button className="font-bold">...</button>
                  </div>

                  <div className="flex-1 overflow-y-auto pb-32">
                    <div className="p-4">
                      <div className="flex flex-col">
                        <div className="flex">
                          <Link to="/" className="flex-shrink-0">
                            <img
                              className="w-8 h-8 rounded-full object-cover bg-blue-800"
                              src={pfpSrc}
                              alt="Profile"
                            />
                          </Link>
                          <div className="ml-4 overflow-hidden">
                            <Link
                              to="/"
                              className="float-left mr-2 font-medium text-sm hover:text-slate-400"
                            >
                              {name}
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
                          <Comment key={comment} commentId={comment} />
                        ))}
                    </div>
                  </div>

                  <div className=" bottom-0 left-0 right-0 h-40  bg-white border-t border-slate-300">
                    <div className="p-4">
                      <div className="flex flex-row pb-2">
                        <div className="flex justify-start">
                          <Like size={20} contentId={uploadId} username={name} likes={likes} setLikes={setLikes}/>
                        </div>
                        <div className="flex-grow"></div>
                        <button className="flex justify-end">e</button>
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
      </div>
    );
  }
