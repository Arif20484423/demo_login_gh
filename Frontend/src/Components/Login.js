import React, { useState, useEffect ,useContext} from "react";
import { useNavigate,Link } from "react-router-dom";
const Login = () => {
 
  //Login with Personal Access Token
  const [msg,setmsg]=useState("");
  const [pat, setPat] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  async function handlelogin() {
    const response = await fetch(`http://167.99.158.160:5000/api/auth/createwithpa`, {
      method: "POST",  // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({email:email,password:pass,token:pat})
    });
    const json=await response.json();
    // console.log(json)s
    if(json.success){
      localStorage.setItem('token',pat);
      navigate('/');
    }
    else{
      setmsg("Either user exists or invalid email")
      setTimeout(()=>{
        setmsg("");
      },3000);
    }
  }

  //Login with github
  
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
        <input
          placeholder="Enter your Personal Access Token"
          className="form-control my-2"
          id="pat"
          type="text"
          style={{ display: "block", minWidth: "250px" }}
          onChange={(e) => {
            // console.log(etarget.value)
            setPat(e.target.value);
          }}
        />
        <p style={{color:"red"}}>{msg}</p>
        <button
          className="btn btn-dark mx-auto my-2"
          style={{ display: "block" }}
          onClick={handlelogin}
        >
          Signin with pat
        </button>
        {/* <button
          className="btn btn-dark mx-auto my-2"
          style={{ display: "block" }}
          onClick={loginwithgithub}
        >
          Login with Github
        </button> */}
        <div style={{textAlign:"center"}}><Link  to='/loginwithgithub'>Signup with Github</Link></div>
        <div style={{textAlign:"center"}}><Link  to='/signin'>Already a user sign in</Link></div>
      </div>
    </div>
  );
};

export default Login;
