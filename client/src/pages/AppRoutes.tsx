import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Error from "./Error";
import UserPage from "./UserPage";
import ExplorePage from "./ExplorePage";


export default function Approutes(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/explore/" element={<ExplorePage/>}/>
                <Route path="/:id" element={<UserPage/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
        
        </>
    )
}