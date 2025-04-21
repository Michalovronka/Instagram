import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import useAuthentication, {
  BasicUserInfo,
} from "../../hooks/useAuthentication";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import ErrorContent from "../../components/ErrorContent/ErrorContent";
import Loading from "../../components/Loading/Loading";
import Upload from "../../components/Upload/Upload";
import FollowPopUp from "../../components/FollowPopUp/FollowPopUp";

//TODO: sm responsive
interface ProfileInfo {
  bio: String;
  highlights: String[];
  tagged: String[];
  following: String[];
  followers: String[];
}

type Sections = "Uploads" | "Saved";

export default function UserPage() {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const { username } = useParams();
  const { isLoading } = useAuthentication();
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState<Boolean>(true);
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const [profile, setProfile] = useState<ProfileInfo>();
  const [uploads, setUploads] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [section, setSection] = useState<Sections>("Uploads");
  const [followersNumber, setFollowersNumber] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isFollowingFromStart, setIsFollowingFromStart] =
    useState<boolean>(false);

  useEffect(() => {
    setIsFollowing(false)
    setIsFollowingFromStart(false)
    setIsLoadingUser(true);
    fetchData();
  }, [username]);

  useEffect(()=>{
    const getSaved = async()=>{
      setSaved(await api.get(`/saved/getAllSavedByUser/${username}`))
    }
    if(section === "Saved") getSaved();
  },[section])

  useEffect(() => {
    const asyncIsFollowing = async () => {
      const response = await api.get(
        `/profile/isFollowing/${loggedInUser.userName}/${username}`
      );
      if (response) {
        setIsFollowing(true);
        setIsFollowingFromStart(true);
      }
    };
    if (loggedInUser.userName && username) asyncIsFollowing();
  }, [loggedInUser, username]);

  const handleFolllowButton = async () => {
    if (!loggedInUser.userName) navigate("/");
    const isFollowingCurrently = !isFollowing;
    try {
      if (isFollowingCurrently) {
        setFollowersNumber(isFollowingFromStart ? 0 : 1);
        await api.post(
          `/profile/addFollower/${loggedInUser.userName}/${username}`
        );
      } else {
        setFollowersNumber(isFollowingFromStart ? -1 : 0);
        await api.delete(
          `/profile/deleteFollower/${loggedInUser.userName}/${username}`
        );
      }
      setIsFollowing(!isFollowing);
    } catch (err: unknown) {
      console.error((err as { message?: string }).message || "Error");
    }
  };

  const fetchData = async () => {
    try {
      setUser(await api.get(`/user/${username}`));
      setProfile(await api.get(`/profile/${username}`));
      setUploads(await api.get(`/upload/getAllUploadsByUser/${username}`));
      setSaved(await api.get(`/saved/getAllSavedByUser/${username}`));
      setFollowersNumber(0);
    } catch (err: unknown) {
      console.error((err as { message?: string }).message || "Error");
    } finally {
      setIsLoadingUser(false);
    }
  };

  if (isLoading || isLoadingUser) return <Loading />;
  if (!user || !profile) return <ErrorContent errorMessage="User not found" />;

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
                        <Button
                          onClick={() => navigate("/accounts/edit")}
                          text="Edit profile"
                        />
                        <Button text="View Archive" />
                      </div>
                    ) : isFollowing ? (
                      <>
                        <Button
                          onClick={handleFolllowButton}
                          text="Following"
                        />
                        <Button text="Mesasage" />
                      </>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleFolllowButton()}
                          className="hover:bg-blue-500 bg-sky-400 text-white text-sm font-semibold rounded-lg py-2 px-4"
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

                  <FollowPopUp
                    users={profile.followers}
                    type="Followers"
                    profileUserName={username!}
                    followersNumber={followersNumber}
                  />
                  <FollowPopUp
                    users={profile.following}
                    type="Following"
                    profileUserName={username!}
                  />
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
            <button
              className={`${section === "Uploads" && "font-bold"}`}
              onClick={() => setSection("Uploads")}
            >
              POSTS
            </button>
            {loggedInUser.userName === username && (
              <button
                className={`${section === "Saved" && "font-bold"}`}
                onClick={() => setSection("Saved")}
              >
                {" "}
                SAVED
              </button>
            )}
            {/* WHEN LOGGED IN | AND ALSO ADD REELS */}
            {/*<button>TAGGED</button>*/}
          </div>

          {section === "Uploads" && uploads.length === 0 && (
            <div className="flex justify-center mt-20 text-4xl">
              No Uploads yet
            </div>
          )}
          {section === "Uploads" && (
            <div className="grid gap-1 grid-cols-3 pb-20">
              {uploads &&
                uploads
                  .slice()
                  .reverse()
                  .map((upload: string) => (
                    <Upload
                      key={upload}
                      loggedInUserUsername={loggedInUser.userName}
                      name={user.userName}
                      pfpSrc={user.pfpSrc}
                      uploadId={upload}
                      type={"Profile"}
                    />
                  ))}
              {!saved && <div>Error loading Uploads...</div>}
            </div>
          )}
          {section === "Saved" && saved.length === 0 && (
            <div className="flex justify-center mt-20 text-4xl">
              Nothing Saved yet
            </div>
          )}
          {section === "Saved" && (
            <div className="grid gap-1 grid-cols-3 pb-20">
              {saved &&
                saved
                  .slice()
                  .reverse()
                  .map((upload: string) => (
                    <Upload
                      key={upload}
                      loggedInUserUsername={loggedInUser.userName}
                      name={user.userName}
                      pfpSrc={user.pfpSrc}
                      uploadId={upload}
                      type={"Profile"}
                    />
                  ))}
              {!saved && <div>Error loading Saved...</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
