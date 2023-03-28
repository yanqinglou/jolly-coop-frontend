import React, {useState, useEffect, useRef} from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css"
import { Login } from "./components/pages/Login"
import  Navbar  from "./components/Navbar"
import API from "./utils/API"
import FindGame from "./components/pages/Find-Game"
import MyProfile from "./components/pages/My profile";
import MyList from "./components/pages/My-List"
import "./components/pages/Find-Game/style.css"
import MyGroups from "./components/pages/My-Group";
import FindFriend from "./components/pages/Find-Friend";
import Allgamesingroup from "./components/pages/Mygroup-games";
import Home from "./components/pages/Home"
import Footer from "./components/Footer";
import HomeLogout from "./components/pages/HomeLogout"
import Signup from "./components/pages/Sign up"
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});


  const headerFooter = window.location.pathname!=="/login"&&window.location.pathname!=="/signup"


  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    // console.log(savedToken)
    if(savedToken){
      API.isValidToken(savedToken).then(tokenData=>{
        if(tokenData.isValid){
          setToken(savedToken);
          setUserId(tokenData.user.id)
          setUserName(tokenData.user.username)
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem("token")
        }
      })
      API.getUserData(userId, token).then((data) => {
        // console.log(data)
        setUser(data);
      });

    }
  },[])


  const logout = ()=>{
    setToken('');
    setUserId(0);
    setIsLoggedIn(false);
    localStorage.removeItem("token")
    return(
      window.location.href = "/"
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
     {headerFooter&&<Navbar isLoggedIn={isLoggedIn} userId={userId}  userName={userName} logout={logout} user={user}/>}
      <br/>
      <Routes>
      <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} userId={userId}/>}/>
      <Route path="/signup" element={<Signup setToken={setToken} setUserId={setUserId} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} userId={userId}/>}/>
        <Route path="/" element={<HomeLogout/>}/>
         <Route path="/home/:id" element={<Home token={token} userId={userId}/>}/>
         <Route path="/myprofile/:id" element={<MyProfile token={token} userId={userId}/>}/>
        <Route path="/signup" element={<h1>Signup</h1>}/>
        <Route path="/findfriend" element={<FindFriend token={token} userId={userId} userName={userName}/>}/>
        <Route path="/findgames" element={<FindGame/>}/>
        <Route path="/mygroup/:id/games" element={<Allgamesingroup token={token} userId={userId} userName={userName}/>}/>
        <Route path="/mylist" element={<MyList />}/>
        <Route path="/mygroup" element={<MyGroups token={token} userId={userId} userName={userName}/>}/>
        <Route path="*" element={<h1>404 page not found</h1>}/>
      </Routes>
      {headerFooter&&<Footer/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
