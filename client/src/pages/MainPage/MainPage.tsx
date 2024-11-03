import Navbar from "../../components/Navbar/Navbar";
import MainPagePost from "../../components/MainPagePost/MainPagePost";

//TODO : fix margin so the div aligns with the original
//       e
//       e
//       e

function MainPage() {
    return (  
        <>
            <div className="flex">
                <Navbar />
                <div className="md:mt-10 xl:ml-60 w-main-content ">
                    <div className="flex gap-3 pb-2.5 border-b border-b-slate-300 "> 
                        <div className="font-bold cursor-pointer">For you </div> 
                        <div className="font-bold text-stone-300 cursor-pointer">Following</div>
                    </div>
                    
                    <div className="flex gap-5 my-7">
                        <div>
                            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" className="max-w-14 rounded-full mb-2" alt="" />
                            <div className="text-xs text-center text-slate-500">skibidi</div>
                        </div>
                        <div>
                            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" className="max-w-14 rounded-full mb-2" alt="" />
                            <div className="text-xs text-center text-slate-500">skibidi</div>
                        </div>
                        <div>
                            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" className="max-w-14 rounded-full mb-2" alt="" />
                            <div className="text-xs text-center text-slate-500">skibidi</div>
                        </div>
                        <div>
                            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" className="max-w-14 rounded-full mb-2" alt="" />
                            <div className="text-xs text-center text-slate-500">skibidi</div>
                        </div>
                    </div>

                    <MainPagePost/>
                    <MainPagePost/>
                    <MainPagePost/>
                </div>
            </div>
            
        </>
    );
}

export default MainPage ;