import Navbar from "../Navbar/Navbar";

interface ErrorContentProps {
  errorMessage: string;
}

export default function ErrorContent({ errorMessage }: ErrorContentProps) {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="lg:-mt-20 mt-4 text-center flex justify-center items-center mx-auto text-5xl">
          Error : {errorMessage}
        </div>
      </div>
    </>
  );
}
