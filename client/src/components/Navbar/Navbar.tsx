import { useSelector } from "react-redux";
import NavbarButton, { NavbarButtonProps } from "../NavbarButton/NavbarButton";
import { RootState } from "../../store";
import SearchBar from "../Searchbar/Searchbar";
import { useState } from "react";

//change width of the whole navbar - real ig is a little wider

//TODO: Vertical (X axis) responsiveClasses
//      add icons
//      make button only bold when the action is selected

function Navbar() {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const [isSearchingOpen, setIsSearchingOpen] = useState<boolean>(false);

  const navbarItems: NavbarButtonProps[] = [
    {
      src: "./homeIcon.png", //https://www.iconpacks.net/free-icon/home-2502.html
      text: "Home",
      responsiveClasses: "max-md:order-1",
    },
    {
      src: "./searchIcon.png", //https://www.iconpacks.net/free-icon/search-2903.html
      text: "Search",
      responsiveClasses: "max-md:hidden",
      setIsSearchingOpen: setIsSearchingOpen,
      isSearchingOpen: isSearchingOpen
    },
    {
      src: "./exploreIcon.png", //https://www.iconpacks.net/free-icon/tiktok-explore-symbol-black-outline-23147.html
      text: "Explore",
      responsiveClasses: "max-md:order-2",
    },
    {
      src: "./reelsIcon.png", //https://www.iconpacks.net/free-icon/instagram-reels-13409.html
      text: "Reels",
      responsiveClasses: "max-md:order-3",
    },
    {
      src: "./messagesIcon.png", //https://www.iconpacks.net/free-icon/send-4008.html
      text: "Messages",
      responsiveClasses: "max-md:order-5",
    },
    {
      src: "./likeIcon.png", //https://www.iconpacks.net/free-icon/heart-3510.html
      text: "Notifications",
      responsiveClasses: "max-md:hidden",
    },
    {
      src: "./createIcon.png", //https://www.iconpacks.net/free-icon/add-button-12004.html
      text: "Create",
      responsiveClasses: "max-md:order-4",
    },
    {
      src: loggedInUser.pfpSrc,
      text: "Profile",
      responsiveClasses: "max-md:order-6",
      logoImg: "rounded-full"
    },
  ];
  if(loggedInUser.userName) return (
    <>
      <div className=" flex justify-center h-12 w-full bottom-0 fixed max-md:border-t border-t-slate-300 bg-white | md:w-18 md:gap-[1px] md:h-screen md:top-0 md:sticky md:pt-6 md:pb-4 md:px-3 md:border-r md:border-r-slate-300 | xl:min-w-[15.30rem] ">
        <div className="flex flex-row w-[48rem] mx-auto justify-evenly h m-0 | md:px-0 md:flex-col ">
          <NavbarButton
            src="./instagramIcon.png" //https://www.iconpacks.net/free-icon/black-instagram-logo-3497.html
            text="Instagram"
            responsiveClasses="max-md:hidden font-grandhotel text-3xl"
            logoCSS=" text-2xl md:mb-6 xl:hover:bg-white"
            logoImg="xl:hidden"
          />

          {navbarItems.map((item, index) => (
            <NavbarButton
              src={item.src}
              key={index}
              text={item.text}
              responsiveClasses={item.responsiveClasses}
              setIsSearchingOpen={setIsSearchingOpen}
              isSearchingOpen = {isSearchingOpen}
              logoImg={item.logoImg}
            />
          ))}

          <div className="mt-auto max-md:hidden">
            <NavbarButton
              src="./logOutIcon.png" //https://www.iconpacks.net/free-icon/exit-2860.html
              text="Log Out"
            />
          </div>
        </div>      

      </div>
      <SearchBar 
        isSearchingOpen={isSearchingOpen} 
      />
    </>
  );
}

export default Navbar;
