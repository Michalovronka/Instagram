import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import useAuthentication from "../../hooks/useAuthentication";
import Loading from "../../components/Loading/Loading";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { shallowEqual } from "react-redux";

const allowedFormats = ["image/png", "image/jpeg", "image/webp", "video/mp4"];

export default function UploadPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.value,
    shallowEqual
  );
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);

  const navigate = useNavigate();
  const { isLoading } = useAuthentication();

  const [fileName, setFileName] = useState<String>("No file chosen");
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [formData, setFormData] = useState<{
    uploadFile: File | null;
    description: string;
  }>({
    uploadFile: null,
    description: "",
  });

  const validateFileType = (file: File) => {
    if (!allowedFormats.includes(file.type)) {
      setErrorMessage(
        "Invalid file format. Please upload a JPG, PNG, WEBP or Mp4 file."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event.target.files || event.target.files.length < 0) {
      setFileName("No file chosen");
      return;
    }
    if (!validateFileType(event.target.files![0])) {
      return;
    }

    setFormData({
      ...formData,
      uploadFile: event.target.files[0],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    postForm();
  };

  const postForm = async () => {
    const formDataToSend = new FormData();

    //username bty authentication pls
    formDataToSend.append("uploadedByUserName", loggedInUser.userName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("uploadFile", formData.uploadFile!);

    try {
      await api.post("/upload/createUpload", formDataToSend);
      navigate(`/${loggedInUser.userName}`);
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      };
      setErrorMessage(error.message || "Upload failed");
    }
  };
 
  if (!isAuthenticated) navigate("/");
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex">
        <Navbar />

        {!formData.uploadFile && (
          <div className="flex flex-1 flex-col items-center gap-3 justify-center">
            <p className="text-2xl">Create a new Post or Story</p>
            <label
              htmlFor="fileInput"
              className="hover:bg-blue-500 hover:cursor-pointer px-4 py-1.5 bg-sky-400 text-white font-medium text-sm rounded-md"
            >
              Select From Computer
            </label>
            <span className="text-sm text-gray-300">{fileName}</span>
            <span className="text-sm text-red-700">{errorMessage}</span>
            <input
              id="fileInput"
              className="hidden"
              type="file"
              name="uploadFile"
              onChange={handleFileChange}
            />
          </div>
        )}

        {formData.uploadFile && (
          <div className="flex flex-1 items-center gap-3 justify-center ">
            <div className="rounded-sm p-10 shadow-lg max-w-[200rem] mb-20">
              <img src={URL.createObjectURL(formData.uploadFile)} alt="alt" />
              <form
                encType="multipart/form-data"
                className="flex flex-col gap-2 text-xs text-black placeholder-slate-500"
              >
                <textarea
                  name="description"
                  required
                  placeholder="Description"
                  onChange={handleChange}
                  rows={3}
                  className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100 resize-none"
                ></textarea>

                <button
                  onClick={handlePost}
                  className="hover:bg-blue-500 bg-sky-400 text-white font-medium text-sm rounded-md p-1.5 mt-1.5"
                >
                  Upload It
                </button>
                {errorMessage && (
                  <p className="text-red-600 text-center text-sm">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
