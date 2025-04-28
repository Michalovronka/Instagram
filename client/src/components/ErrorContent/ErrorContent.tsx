import Navbar from "../Navbar/Navbar";
  

export default function ErrorContent() {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="lg:-mt-20 mt-4 text-center flex justify-center items-center mx-auto text-5xl">
          404 Not found
        </div>
      </div>
    </>
  );
}
