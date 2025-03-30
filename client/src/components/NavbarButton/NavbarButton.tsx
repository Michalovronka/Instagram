import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";

export type NavbarButtonProps = {
  src: string;
  text: navbarItemsType;
  responsiveClasses?: string;
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
  | "Threads"
  | "More";

function NavbarButton(props: NavbarButtonProps) {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const navigate = useNavigate();

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
        break;
      case "Explore":
        navigate("/explore/");
        window.scrollTo({
          top: 0,
        });
        break;
      case "Reels":
        break;
      case "Messages":
        break;
      case "Notifications":
        break;
      case "Create":
        navigate("/upload")
        window.scrollTo({
          top: 0,
        });
        break;
      case "Profile":
        navigate(`/${loggedInUser.userName}`, { replace: true });
        window.scrollTo({
          top: 0,
        });
        break;
      case "Threads":
        break;
      case "More":
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
