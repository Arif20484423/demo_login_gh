import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home"
import Login from "./Components/Login"
import Loginwithgithub from "./Components/Loginwithgithub"
import Signin from "./Components/Signin"
import Notestate from "./Context/Notestate";
function App() {
  const [logged,setLogged]= useState(false);
  const [data,setData]=useState([]);
  let repourl = "";
 
  

  // .then((data) => { 
  //   fetch(data.repos_url)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // })

  return (
    <Notestate>
    <BrowserRouter>
      <div>
        <Navbar logged={logged} setLogged={setLogged} data={data} setData={setData}/>
        <Routes>
        <Route >
          <Route index element={<Home logged={logged} setLogged={setLogged} data={data} setData={setData}/>} />
          <Route path="login" element={<Login logged={logged} setLogged={setLogged} data={data} setData={setData}/>} />
          <Route path="loginwithgithub" element={<Loginwithgithub logged={logged} setLogged={setLogged} data={data} setData={setData}/>} />
          <Route path="signin" element={<Signin logged={logged} setLogged={setLogged} data={data} setData={setData}/>} />
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
    </Notestate>
  );
}

export default App;
