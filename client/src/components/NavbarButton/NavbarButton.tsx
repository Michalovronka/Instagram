import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import api from "../../api";


export type NavbarButtonProps = {
  src: string;
  text: navbarItemsType;
  responsiveClasses?: string;
  setIsSearchingOpen?: (isOpen:boolean)=>void;
  isSearchingOpen?:boolean
  logoCSS?: string;
  logoImg?: string;
};

export type navbarItemsType =
  | "Instagram"
  | "Home"
  | "Search"
  | "Explore"
  | "Reels"
  | "Messages"
  | "Notifications"
  | "Create"
  | "Profile"
  | "Log Out";

function NavbarButton(props: NavbarButtonProps) {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  
  const navigate = useNavigate();
  const logOut = async () => {
    await api.post("/auth/logOut");
    window.location.reload();
  };
  function handleOnClick() {
    switch (props.text) {
      case "Instagram":
      case "Home":
        navigate("/");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Search":
        console.log(props.isSearchingOpen)
        if(props.setIsSearchingOpen) props.setIsSearchingOpen(!props.isSearchingOpen)
        break;
      case "Explore":
        navigate("/explore");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Reels":
        navigate("/reels");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Messages":
        navigate("/direct");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Notifications":
        navigate("/notifications");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Create":
        navigate("/upload");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Profile":
        navigate(`/${loggedInUser.userName}`);
        window.scrollTo({
          top: 0,
        });
        break;
      case "Log Out":
        logOut();
        break;
    }
  }

  return (
    <>
      <button
        className={`flex min-w-12 rounded-lg ${props.responsiveClasses} items-center justify-center group | md:items-start md:justify-normal md:active:text-gray-400 md:active:bg-neutral-100 md:hover:bg-neutral-200 duration-300 md:w-full md:pl-3 md:py-3 md:mb-2 md:cursor-pointer | ${props.logoCSS}`}
        onClick={handleOnClick}
      >
        <img
          className={`w-6 h-6 md:group-hover:scale-110 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer | md:mr-4 | ${props.logoImg}`}
          src={props.src}
          alt="button icon"
        />
        <div className="xl:block hidden">{props.text}</div>
      </button>

    </>
  );
}

export default NavbarButton;
