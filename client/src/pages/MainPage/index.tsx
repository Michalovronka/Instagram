import Navbar from "../../components/Navbar/Navbar";
import MainPagePost from "../../components/MainPagePost/MainPagePost";
import StoriesBar from "./StoriesBar";
import React, { useEffect, useState } from "react";
import api from "../../api"

//TODO : make the switch account work (on the right side)
//       make the posts load from database and load from it

interface InstagramLink {
  link: string;
  keyword: string;
};

const instagramLinks: InstagramLink[] = [
  { link: "https://about.instagram.com/", keyword: "About" },
  { link: "https://help.instagram.com/", keyword: "Help" },
  { link: "https://about.instagram.com/blog", keyword: "Press" },
  { link: "https://developers.facebook.com/docs/instagram-platform", keyword: "API",},
  { link: "https://about.instagram.com/about-us/careers", keyword: "Jobs" },
  { link: "https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect", keyword: "Privacy",},
  { link: "https://help.instagram.com/581066165581870/", keyword: "Terms" },
  { link: "https://www.instagram.com/explore/locations/", keyword: "Locations" }, //https://www.instagram.com/explore/locations/ mozna udelej nastaveni loool 
  { link: "https://www.instagram.com/language/preferences/", keyword: "Laungage" }, //https://www.instagram.com/language/preferences/ mozna udelej nastaveni loool 
  { link: "https://accountscenter.instagram.com/meta_verified/?entrypoint=web_footer", keyword: "Meta Verified",}
];

function MainPage() {

  const [isLoggedIn, setIsLoggedIn] = useState <Boolean> (false);
  const [isLoading, setIsLoading] = useState <Boolean> (true);
  const [formData, setFormData] = useState({
    emailLogin: '',
    passwordLogin: ''
  });

  //neco neco strictmode dava 2x proste
  useEffect(() => {
    const fetchToken = async () => {
      try {
        await api.post('/auth/getToken');
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (err: unknown) {
        setIsLoading(false);
        const error = err as { 
          message?: string; 
        };
        console.log(error.message || 'Token not found ');
      }
    };
    fetchToken();
  }, []);

  const postForm = async () =>{
    if(!formData) return;
    try {
      await api.post('/auth/login', {
        email: formData.emailLogin,
        password: formData.passwordLogin
      });
      setIsLoggedIn(true);
    } catch (err : unknown) {
      const error = err as { 
        message?: string; 
      };
      console.log(error.message || 'Login failed');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePost = (e: React.FormEvent) =>{
      e.preventDefault();
      postForm();
  }

  
  if(!isLoggedIn && !isLoading){
    return(
      <>
        <div className="m-auto w-[56rem] h-[650px] flex mt-11">
          <div className="bg-black w-3/5 p-6 ">w
      
          </div>
          <div className="w-1/2 mx-7 text-sm">
            <div className="border border-slate-300">
              <div className="p-11 text-5xl m-auto text-center">Instagram</div>

              <form className="flex flex-col px-12 gap-2">
                <input type="text" name="emailLogin" required placeholder="Email" onChange={handleChange} className="border border-slate-300 rounded p-1.5 text-black placeholder-slate-300 bg-slate-100"/>
                <input type="password" name="passwordLogin" required placeholder="Heslo" onChange={handleChange} className="border border-slate-300 rounded p-1.5 text-black placeholder-slate-300 bg-slate-100" />
                <button onClick={handlePost} className="hover:bg-blue-500 bg-sky-400 text-white font-medium text-sm rounded-md p-1.5 mt-1.5">
                    Přihásit se
                </button>
              </form>

              <div className="flex mx-12 gap-4 mt-6">
                <div className="mt-2 w-5/12 border-t flex-row border-t-slate-300 "></div>
                <div className="text-center text-sm text-slate-400">NEBO</div>
                <div className="mt-2 w-5/12 border-t flex-row border-t-slate-300"></div>
              </div>
              <div className="flex flex-col gap-6 text-center py-6 mx-12">
                <div className="text-sky-400 text-sm">Přihlásit se přes Facebook</div>
                <div className="text-blue-950">Zapomněl(a) jste heslo?</div>
                <div className="text-xs text-slate-500">Můžete také nahlásit obsah, o kterém si myslíte, že je nezákonný ve vaší zemi, aniž by bylo nutné se přihlásit.</div>
              </div>
            </div>
            <div>
              <div className="mt-2 p-5 text-center border border-slate-300 "> Nemáte účet? <span className="text-sky-400 font-medium">Zaregistrujte se</span> </div>
            </div>
            <div>
              <div className="text-center m-4">Stáhněte si aplikaci.</div>
              <div className="flex justify-between gap-2 mx-16 h-10">
                <a  href=""><img className="h-full"src="https://static.cdninstagram.com/rsrc.php/v4/yL/r/ZnkTJtGew6t.png" /></a>
                <a href=""><img className="h-full"src="https://static.cdninstagram.com/rsrc.php/v4/yy/r/IB9MrnOOUr3.png" /></a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

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
