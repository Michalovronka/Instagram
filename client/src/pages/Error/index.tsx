import Navbar from "../../components/Navbar/Navbar";

function Error() {
    return (  
        <>
        <div className="flex">
            <Navbar />
            <div className="lg:-mt-20 mt-4 flex justify-center items-center mx-auto text-6xl"> Error has Ocurred</div>
        </div>
        </>
    );
}

export default Error;