import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Error from "./Error";
import UserPage from "./UserPage";
import ExplorePage from "./ExplorePage";
import RegisterPage from "./RegisterPage";


export default function Approutes(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/accounts/emailsignup/" element={<RegisterPage/>}/>
                <Route path="/:username" element={<UserPage/>}/>
                <Route path="/explore/" element={<ExplorePage/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
        
        </>
    )
}