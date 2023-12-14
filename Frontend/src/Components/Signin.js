import React,{useContext,useEffect, useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import Notecontext from "../Context/Notecontext"
const Signin = () => {
  
  const navigate=useNavigate();
  let context=useContext(Notecontext);
  let {toupdate,loginwithgithub,updateemail,updatepass} = context;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg,setmsg]=useState("");
  async function handlesignin(){
    const response = await fetch(`http://167.99.158.160:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { 
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({email:email,password:pass})
    });
      const json=await response.json();
      // console.log(json)
      if(json.success){
        if(json.date){
          let d= new Date();
          let dp=new Date(json.date);
          let diff=(d.getFullYear-dp.getFullYear)*12+(d.getMonth()-dp.getMonth());
          if(diff>=5){
              
              loginwithgithub(true,email,pass);
          }
          // let d= new Date().getDate();
          // let dp=new Date(json.date).getDate()+1;
          // console.log(d)
          // console.log(dp);
          // if(dp==d){
          //     toupdate=true;
          //     console.log("signintoupdate"+toupdate);
          //     console.log("going")
          //     updateemail=email;
          //     updatepass=pass;
              
          //       loginwithgithub(true,email,pass);
              
          // }
        }
          localStorage.setItem('token',json.token);
          navigate('/')
      }
      else{
        console.log("else")
        setmsg(json.error);
        setTimeout(()=>{
          setmsg("")
        },3000);
      }
  }
  useEffect(()=>{
    setTimeout(() => {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") !== null
      ) {
        navigate('/');
      }  
    }, 2000);
    
  },[])
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
          placeholder="Password"
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
          className="btn btn-dark mx-auto my-2"
          style={{ display: "block" }}
          onClick={handlesignin}
        >
         Signin
        </button>
        {/* <button
          className="btn btn-dark mx-auto my-2"
          style={{ display: "block" }}
          onClick={loginwithgithub}
        >
          Login with Github
        </button> */}
        <div style={{textAlign:"center"}}><Link  to='/login'>Signup with Personal Token</Link></div>
        <div style={{textAlign:"center"}}><Link  to='/loginwithgithub'>Signup with Github</Link></div>
      </div>
    </div>
  )
}

export default Signin