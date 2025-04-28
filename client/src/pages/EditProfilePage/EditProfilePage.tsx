import Navbar from "../../components/Navbar/Navbar";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../slices/LoggedInUserSlice";
import useAuthentication, {
  BasicUserInfo,
} from "../../hooks/useAuthentication";
import { useState } from "react";

export default function EditProfilePage() {
  useAuthentication();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    pfpFile: File | null;
    userName: string | null;
    displayName: string | null;
    bio: string | null;
  }>({
    pfpFile: null,
    userName: null,
    displayName: null,
    bio: null,
  });
  const [deleteText, setDeleteText] = useState<string>("");

  const postForm = async () => {
    const formDataToSend = new FormData();
    if (formData.userName) formDataToSend.append("userName", formData.userName);
    if (formData.displayName)
      formDataToSend.append("displayName", formData.displayName);
    if (formData.bio) formDataToSend.append("bio", formData.bio);

    if (formData.pfpFile) {
      formDataToSend.append("pfpFile", formData.pfpFile);
    }

    const userNameToUse = formData.userName || loggedInUser.userName;
    try {
      const response: BasicUserInfo = await api.patch(
        `/profile/edit/${loggedInUser.userName}`,
        formDataToSend
      );
      await dispatch(setLoggedInUser(response));
      console.log(response);

      return navigate(`/${userNameToUse}`);
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      };
      console.log(error || "error");
    }
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("Selected file:", e.target.files[0]);
      setFormData({
        ...formData,
        pfpFile: e.target.files[0],
      });
    }
  };

  const handleDeleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteText(e.target.value);
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    postForm();
  };

  const deleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteText.toLowerCase() !== "confirm") return;
    try {
      await api.delete(`/user/${loggedInUser.userName}`);
      await api.post("/auth/logOut")
      navigate("/")
      window.location.reload();  
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      };
      console.log(error || "error");
    }
  };

  return (
    <>
      <div className="flex">
        <Navbar />

        <div className="px-20 mt-10 w-full lg:max-w-[60%] mx-auto ">
          <div className="font-bold text-xl mb-10">Edit profile</div>
          <div className="font-semibold text-lg mt-4">Change Pfp </div>
          <div className="rounded-xl w-full bg-gray-200 p-3 flex justify-between gap-4">
            <div className="flex items-center gap-3 py-2 border-b">
              <img
                src={loggedInUser.pfpSrc}
                alt={`${loggedInUser.userName}'s profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{loggedInUser.userName}</div>
                <div className="text-sm text-gray-500">
                  {loggedInUser.displayName}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="max-w-64 hover:bg-blue-500 hover:cursor-pointer bg-sky-400 text-white font-medium text-sm rounded-md px-3 py-1.5"
                type="file"
                name="pfpFile"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <form
            encType="multipart/form-data"
            className="flex flex-col gap-2 text-xs text-black placeholder-slate-500"
          >
            <div className="font-semibold text-lg mt-4">Change Username </div>
            <input
              type="text"
              name="userName"
              placeholder="Uživatelské jméno"
              onChange={handleChange}
              className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
            />
            <div className="font-semibold text-lg mt-4">
              Change Display Name{" "}
            </div>
            <input
              type="text"
              name="displayName"
              placeholder="Jméno"
              onChange={handleChange}
              className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
            />
            <div className="font-semibold text-lg mt-4">Change Bio </div>
            <textarea
              name="bio"
              placeholder="Bio"
              onChange={handleChange}
              maxLength={100}
              className="resize-none border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
            />

            <button
              onClick={handlePost}
              className="hover:bg-blue-500 bg-sky-400 text-white font-medium text-sm rounded-md p-1.5 mt-1.5"
            >
              Submit
            </button>
          </form>

          <form className="mb-20">
            <div className="flex gap-3 mt-10 justify-center text-sm ">
              <button
                onClick={deleteUser}
                className="bg-red-500 rounded-lg py-2 px-3 text-white"
              >
                Delete this account
              </button>
              <input
                type="text"
                name="deleteInput"
                placeholder="Type Confirm"
                onChange={handleDeleteChange}
                className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
