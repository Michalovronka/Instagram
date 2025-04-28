import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

interface UserData {
  userName: string;
  displayName: string;
  pfpSrc: string;
}

interface Props {
  isSearchingOpen: boolean;
}

const SearchBar = ({ isSearchingOpen }: Props) => {
  const [searchUser, setSearchUser] = useState("");
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searching = setTimeout(async () => {
      if (searchUser.trim()) {
        setLoading(true);
        try {
          setLoadedUsers(await api.get(`/user/search/${searchUser}`));
        } catch (err: unknown) {
          const error = err as {
            message?: string;
          };
          console.error(error.message || "Error while Loading a Upload");
        } finally {
          setLoading(false);
        }
      } else {
        setLoadedUsers([]);
      }
    }, 300);

    return () => clearTimeout(searching);
  }, [searchUser]);

  useEffect(() => {
    console.log("isOpened" + isSearchingOpen);
  }, [isSearchingOpen]);

  return (
    <>
      {isSearchingOpen && (
        <div className="hidden z-20 md:block md:ml-[72px] xl:ml-64 pt-7 max-xl:pl-4 pr-4 bg-white fixed h-screen border-r border-r-slate-300 ">
          <h1 className="text-2xl pb-7 font-medium">Search</h1>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="border px-3 py-1 mb-3 bg-slate-100"
          />

          {loading && <p>Loading...</p>}

          {loadedUsers.map((user: UserData, index: number) => (
            <Link to={`/${user.userName}`}key={index}>
              <div
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
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
