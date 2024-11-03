import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Error from "./Error/Error";


export default function Approutes(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
        
        </>
    )
}