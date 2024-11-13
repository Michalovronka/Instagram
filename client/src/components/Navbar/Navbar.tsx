import NavbarButton, { NavbarButtonProps } from "../NavbarButton/NavbarButton";

//change width of the whole navbar - real ig is a little wider

//TODO: Vertical (X axis) responsiveClasses
//      add icons
//      make button only bold when the action is selected

const navbarItems: NavbarButtonProps[] = [
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Home",
    responsiveClasses: "max-md:order-1",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Search",
    responsiveClasses: "max-md:hidden",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Explore",
    responsiveClasses: "max-md:order-2",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Reels",
    responsiveClasses: "max-md:order-3",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Messages",
    responsiveClasses: "max-md:order-5",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Notifications",
    responsiveClasses: "max-md:hidden",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Create",
    responsiveClasses: "max-md:order-4",
  },
  {
    src: "https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png",
    text: "Profile",
    responsiveClasses: "max-md:order-6",
  },
];

function Navbar() {
  return (
    <>
      <div className="flex justify-center h-12 w-full bottom-0 fixed max-md:border-t border-t-slate-300 bg-white | md:w-18 md:gap-[1px] md:h-screen md:top-0 md:sticky md:pt-6 md:pb-4 md:px-3 md:border-r md:border-r-slate-300 | xl:min-w-[15.30rem] ">
        <div className="flex flex-row w-[48rem] mx-auto justify-evenly h m-0 | md:px-0 md:flex-col ">

          <NavbarButton
            src="https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png"
            text="Instagram"
            responsiveClasses="max-md:hidden"
            logoCSS=" text-2xl md:mb-6 xl:hover:bg-white"
            logoImg="xl:hidden"
          />

          {navbarItems.map((item, index) => (
            <NavbarButton
              src={item.src}
              key={index}
              text={item.text}
              responsiveClasses={item.responsiveClasses}
            />
          ))}

          <div className="mt-auto max-md:hidden">
            <NavbarButton
              src="https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png"
              text="Threads"
            />
            <NavbarButton
              src="https://static-00.iconduck.com/assets.00/settings-icon-1024x1022-x2c1qvd9.png"
              text="More"
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;
