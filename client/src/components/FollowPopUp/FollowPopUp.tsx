import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

interface Props {
  users: String[];
  type: "Followers" | "Following";
  profileUserName: string;
  followersNumber?: number;
}
interface UserData {
  userName: string;
  displayName: string;
  pfpSrc: string;
}

export default function FollowPopUp(props: Props) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState<UserData[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);

  useEffect(() => {
    const asyncWaitforUsers = async () => {
      try {
        setLoadedUsers(
          await api.get(`/profile/getAll${props.type}/${props.profileUserName}`)
        );
      } catch (err: unknown) {
        console.error((err as { message?: string }).message || "Error");
      } finally {
        console.log(loadedUsers);
        setIsLoadingUsers(false);
      }
    };
    if (isUploadOpen) asyncWaitforUsers();
  }, [isUploadOpen, props.followersNumber]);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsUploadOpen(true)}>
        <span className="font-semibold">
          {props.users.length + (props.followersNumber ?? 0)}
        </span>{" "}
        {props.type}
      </div>
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 relative min-w-[300px] max-w-[90%]">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-2 right-2 font-bold mr-1 text-black "
            >
              X
            </button>

            <div className="max-h-[200px] overflow-y-auto pr-4">
              {!isLoadingUsers && loadedUsers.length > 0 ? (
                loadedUsers.map((user: UserData, index: number) => (
                  <Link to={`/${user.userName}`}>
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 border-b"
                    >
                      <img
                        src={user.pfpSrc}
                        alt={`${user.displayName}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{user.userName}</div>
                        <div className="text-sm text-gray-500">
                          {user.displayName}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <> No {props.type} yet :/</>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
