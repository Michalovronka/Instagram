import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import useAuthentication, {
  BasicUserInfo,
} from "../../hooks/useAuthentication";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import api from "../../api";
import { useLocation, useParams } from "react-router-dom";
import ErrorContent from "../../components/ErrorContent/ErrorContent";
import Loading from "../../components/Loading/Loading";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";

//TODO: sm responsive
interface ProfileInfo {
  bio: String;
  highlights: String[];
  tagged: String[];
  following: String[];
  followers: String[];
}

export default function UserPage() {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const { username } = useParams();
  const { isLoading } = useAuthentication();
  const location = useLocation();
  const [isLoadingUser, setIsLoadingUser] = useState<Boolean>(true);
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const [profile, setProfile] = useState<ProfileInfo>();
  const [uploads, setUploads] = useState<string[]>([]);

  useEffect(() => {
    setIsLoadingUser(true);
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      setUser(await api.get(`/user/${username}`));
      setProfile(await api.get(`/profile/${username}`));
      setUploads(await api.get(`/upload/getAllUploadsByUser/${username}`));
    } catch (err: unknown) {
      console.error((err as { message?: string }).message || "Error");
    } finally {
      setIsLoadingUser(false);
    }
  };

  //get user by id lol

  if (isLoading || isLoadingUser) return <Loading />;
  if (!user) return <ErrorContent errorMessage="User not found" />;

  return (
    <>
      <div className="flex">
        <Navbar />

        <div className="w-[59rem] | md:justify-center md:mt-9 mx-auto">
          <div className="pb-10 border-b border-b-slate-300">
            <div className=" pl-16 p-5 flex ">
              <img
                className="md:w-36 md:h-36 w-20 h-20 md:mr-24 mr-8 rounded-full object-cover"
                src={`${user.pfpSrc}`}
              ></img>

              <div className="mb-16">
                <div className="flex flex-col gap-2 mb-4 | md:flex-row">
                  <div className="text-xl mr-3">{user?.userName}</div>
                  <div className="flex flex-row gap-2">
                    {loggedInUser.userName === username ? (
                      <div className="flex gap-3">
                        <Button text="Edit profile" />
                        <Button text="View Archive" />
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          className="hover:bg-blue-500 bg-sky-400 text-white font-medium text-sm rounded-md p-1.5 mt-1.5"
                        >
                          Follow
                        </button>
                        <Button text="Mesasage" />
                      </div>
                    )}
                    <button className="font-bold">...</button>
                  </div>
                </div>

                <div className="flex flex-row gap-10 mb-8">
                  <div>
                    <span className="font-semibold">{uploads.length}</span>{" "}
                    posts
                  </div>
                  <div>
                    <span className="font-semibold">
                      {profile?.followers.length}
                    </span>{" "}
                    followers
                  </div>
                  <div>
                    <span className="font-semibold">
                      {profile?.following.length}
                    </span>{" "}
                    following
                  </div>
                </div>

                <div className="font-medium text-sm">{user?.displayName}</div>
                <div className="text-sm">{profile?.bio}</div>
              </div>
            </div>
            <div className="pl-10 flex gap-14">
              <div className="flex flex-col gap-2">
                <img
                  className="max-w-20 max-h-20"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                ></img>
                <div className="text-xs font-semibold text-center">Franta</div>
              </div>

              <div className="flex flex-col gap-2">
                <img
                  className="max-w-20 max-h-20"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                ></img>
                <div className="text-xs font-semibold text-center">Franta</div>
              </div>

              <div className="flex flex-col gap-2">
                <img
                  className="max-w-20 max-h-20"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                ></img>
                <div className="text-xs font-semibold text-center">Franta</div>
              </div>
            </div>
          </div>

          <div className="my-5 flex gap-20 justify-center text-xs font-medium">
            <button>POSTS</button>
            {loggedInUser.userName === username && <button>SAVED</button>}
            {/* WHEN LOGGED IN | AND ALSO ADD REELS */}
            {/*<button>TAGGED</button>*/}
          </div>

          <div className="grid gap-1 grid-cols-3 pb-20">
            {uploads &&
              uploads
                .slice()
                .reverse()
                .map((upload: string) => (
                  <ProfileUpload
                    key={upload}
                    name={user.userName}
                    pfpSrc={user.pfpSrc}
                    uploadId={upload}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
