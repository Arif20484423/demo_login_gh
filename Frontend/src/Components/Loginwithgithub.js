import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notecontext from "../Context/Notecontext"
const Loginwithgithub = () => {
  const navigate = useNavigate();
  let context=useContext(Notecontext);
  let {codefetched,msg,toupdate,setmsg,handlelogin,loginwithgithub,getaccesst,updateaccesst,updateemail,updatepass} = context;
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  


  useEffect(() => { 
    // console.log("codefetched"+codefetched);
    // console.log("toupdate"+toupdate);
   
    if(localStorage.getItem('update')===true){
      console.log("Running")
      if(!codefetched){
      const urlparams = new URLSearchParams(window.location.search);
      if(urlparams.size>0){
        const myparam = urlparams.get("code");
        updateaccesst(myparam,localStorage.getItem('email'),localStorage.getItem('pass'));
        navigate('/');
        // }
        localStorage.removeItem('update');
        localStorage.removeItem('email');
        localStorage.removeItem('pass');
        console.log("returned")
        codefetched=true;
        }}
        toupdate=false;
    }
    else{
      if(!codefetched){
      
        const urlparams = new URLSearchParams(window.location.search);
              if(urlparams.size>0){
                const myparam = urlparams.get("code");
                setTimeout(() => {
                  navigate('/');
                }, 3000);
                getaccesst(myparam);
                 // if (
              //   localStorage.getItem("token") &&
              //   localStorage.getItem("token") !== null
              // ) {
              //   console.log("turning")
                
              // }
              console.log("returned")
              codefetched=true;
              }
            }
    }
    
    
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "80vh" }}
    >
      <div>
        <input
          placeholder="Email"
          className="form-control my-2"
          type="email"
          style={{ display: "block", minWidth: "250px" }}
          onChange={(e) => {
            // console.log(etarget.value)
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password atleast 5 characters"
          className="form-control my-2"
          type="text"
          style={{ display: "block", minWidth: "250px" }}
          onChange={(e) => {
            // console.log(etarget.value)
            setPass(e.target.value);
          }}
        />
        {/* <input
          placeholder="Enter your Personal Access Token"
          className="form-control my-2"
          id="pat"
          type="text"
          style={{ display: "block", minWidth: "250px" }}
          onChange={(e) => {
            // console.log(etarget.value)
            // setPat(e.target.value);
          }}
        /> */}
        <p style={{color:"red"}}>{msg}</p>
        <button
          className="btn btn-dark mx-auto my-2 "
          style={{ display: "block" }}
          onClick={()=>loginwithgithub(false,email,pass)}
          
        >
          Signin with Github
        </button>
        {/* <button
          className="btn btn-dark mx-auto my-2"
          style={{ display: "block" }}
          onClick={loginwithgithub}
        >
          Login with Github
        </button> */}
        <div style={{ textAlign: "center" }}>
          <Link to="/login">Signup with Personal Token</Link>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/signin">Already a user sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Loginwithgithub;
