import Navbar from "../../components/Navbar/Navbar";

export default function UserPage() {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div>
          <img
            className="max-w-36"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          ></img>
        </div>
      </div>
    </>
  );
}
