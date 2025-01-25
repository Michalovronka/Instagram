import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";

//TODO: sm responsive

export default function UserPage() {
  return (
    <>
      <div className="flex">
        <Navbar />

        <div className="w-[59rem] | md:justify-center md:mt-9 mx-auto">
          <div className="pb-10 border-b border-b-slate-300">
            <div className=" pl-16 p-5 flex ">
              <img
                className="md:max-w-36 md:max-h-36 max-w-20 max-h-20 md:mr-24 mr-8"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              ></img>

              <div className="mb-16">
                <div className="flex flex-col gap-2 mb-4 | md:flex-row">
                  <div className="text-xl mr-3">Username</div>
                  <div className="flex flex-row gap-2">
                    <Button text="Edit profile" />
                    <Button text="View Archive" />
                    <button>g</button>
                  </div>
                </div>

                <div className="flex flex-row gap-10 mb-8">
                  <div>
                    <span className="font-semibold">0</span> posts
                  </div>
                  <div>
                    <span className="font-semibold">44</span> followers
                  </div>
                  <div>
                    <span className="font-semibold">90</span> following
                  </div>
                </div>

                <div>texttexttextextextexetextrexc</div>
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

          <div className="mt-5 flex gap-20 justify-center text-sm">
            <button>POSTS</button>
            <button>SAVED</button> {/* WHEN LOGGED IN | AND ALSO ADD REELS */}
            <button>TAGGED</button>
          </div>
        </div>
      </div>
    </>
  );
}
