import Navbar from "../../components/Navbar/Navbar";
import MainPagePost from "../../components/MainPagePost/MainPagePost";
import StoriesBar from "./StoriesBar";
import React from "react";

//TODO : make the switch account work (on the right side)
//       make the posts load from database and load from it
//       e
//       e
type InstagramLink = {
  link: string;
  keyword: string;
};
const instagramLinks: InstagramLink[] = [
  { link: "https://about.instagram.com/", keyword: "About" },
  { link: "https://help.instagram.com/", keyword: "Help" },
  { link: "https://about.instagram.com/blog", keyword: "Press" },
  {link: "https://developers.facebook.com/docs/instagram-platform", keyword: "API",},
  { link: "https://about.instagram.com/about-us/careers", keyword: "Jobs" },
  {link: "https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect", keyword: "Privacy",},
  { link: "https://help.instagram.com/581066165581870/", keyword: "Terms" },
  { link: "", keyword: "Locations" }, //https://www.instagram.com/explore/locations/
  { link: "", keyword: "Laungage" }, //https://www.instagram.com/language/preferences/
  {link: "https://accountscenter.instagram.com/meta_verified/?entrypoint=web_footer", keyword: "Meta Verified",}
];

function MainPage() {
  return (
    <>
      <div className="flex">
        <Navbar />

        <div className="flex w-full gap-16 | md:justify-center md:mt-10 ">
          <div className="max-md:w-full max-md:flex max-md:flex-col ">
            <div className="mx-0  flex gap-3 md:pb-2.5 border-b border-b-slate-300 ">
              <button className="font-bold cursor-pointer | max-md:flex max-md:text-2xl max-md:mt-3 max-md:mb-4 max-md:ml-4 max-md:hover:bg-neutral-200">
                For you
                <div className="md:hidden | ml-2">v </div> {/* ONLCIK ADD HERE */}
              </button>

              <div className="hidden | md:flex font-bold text-stone-400 cursor-pointer">
                Following
              </div>

              <div className="md:hidden ml-auto flex">
                <input className=" bg-neutral-200 m-3 items-center rounded-md px-9" type="text" placeholder="Search "/>
                <button className=" mt-3 mb-4 rounded-md px-6"> h</button>
              </div>
              
            </div>

            <div className="max-md:mx-auto max-md:w-full max-md:px-11">
                <StoriesBar />
            </div>
            <div className="md:px-20 | max-md:mx-auto ">
              <MainPagePost />
              <MainPagePost />
              <MainPagePost />
            </div>
          </div>

          <div className="hidden | min-[1111px]:flex h-48  flex-col w-[19.25rem] p-2 pt-4 text-sm font-semibold">
            <div className="w-full flex flex-row gap-2 justify-center items-center mb-8">
              <img
                className="w-11 h-11"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              />
              <div className="flex-col">
                <div>Username</div>
                <div className="text-stone-400">Jmenuju se</div>
              </div>
              <button className="ml-auto h-12 text-blue-500 text-xs text-normal">
                Switch
              </button>
            </div>

            <div className="w-full font-[450] text-[11.25px] line text-stone-400 mb-6 leading-5 ">
              {instagramLinks.map((item, index) => {
                return (
                  <React.Fragment key={`${item.keyword}-${index}`}>
                    <a className="hover:underline" href={item.link}>
                      {item.keyword}
                    </a>
                    {index !== instagramLinks.length - 1 && (
                      <span>&nbsp;.&nbsp;</span>
                    )}
                    {index === 6 && <br />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="font-normal text-xs text-stone-400">
              {" "}
              © 2024 INSTAGRAM FROM META
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
