import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../store";
import Upload from "../../components/Upload/Upload";
import { useEffect, useState } from "react";
import api from "../../api";

export default function ExplorePage() {

    // kdyz refreshnu tak ten upload + navabr nefungujou prsote wtf

  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const [tempUploads, setTempUploads] = useState<string[]>([]);
  const [uploads, setUploads] = useState<string[]>([]);

  useEffect(() => {
    const getUploads = async () => {
      setUploads(await api.get("/upload/getRandomUploads"));
      setTempUploads(await api.get("/upload/getRandomUploads"));
    };
    getUploads();
  }, [loggedInUser]);

  const handleClick = () => {
    console.log("BAlls")
    const getMoreUploads = async () => {
      setTempUploads(await api.get("/upload/getRandomUploads"));
      setUploads([...tempUploads, ...uploads])
    };
    getMoreUploads();
  };

  if (loggedInUser === null) return null;
  return (
    <>
      <div className="flex">
        <Navbar />

        <div className=" mx-auto flex justify-center min-h-screen">
          <div className=" max-w-[62rem] items-center | md:justify-center md:mt-16 m-2 ">
            <h1 className="font-bold mb-3">For you</h1>

            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 pb-20">
              {uploads &&
                uploads
                  .slice()
                  .reverse()
                  .map((upload: string,index:number) => (
                    <Upload
                      key={index}
                      loggedInUserUsername={loggedInUser.userName}
                      uploadId={upload}
                      type={"Explore"}
                    />
                  ))}
            </div>
            <button className="hover:bg-blue-500 bg-sky-400 text-white font-medium rounded-md p-1.5 mt-1.5" onClick={handleClick}>More</button>
          </div>
        </div>
      </div>
    </>
  );
}
