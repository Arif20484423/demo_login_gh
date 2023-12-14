import React,{useState} from "react";
import Notecontext from "./Notecontext";
 const Notestate=(props)=>{
    const [msg,setmsg]=useState();
    let codefetched=false;
    let toupdate=false;
    let updateemail="";
    let updatepass="";
    async function handlelogin(email,pass,pat) {
        localStorage.removeItem('email')
        localStorage.removeItem('pass')
        
        let d=new Date();
        const response = await fetch(
          `https://demo-web-pxtm.onrender.com/api/auth/createwithpa`, 
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: email, password: pass, token: pat ,date:d}),
          }
        );
        const json = await response.json();
        // console.log(json);
        if (json.success) {
          localStorage.setItem("token", pat);
        //   navigate("/");
        } else {
          setmsg("Either user exists or invalid email");
          setTimeout(() => {
            setmsg("");
          }, 3000);
        }
      }
      const client_id = process.env.REACT_APP_CLIENT_ID;
      const client_secret = process.env.REACT_APP_CLIENT_SECRET;
      function loginwithgithub(update,email,pass) {
        if(email.length>5 && pass.length>5){
           
          window.location.assign(
            "https://github.com/login/oauth/authorize?client_id=" + client_id
          );
          console.log("updatiung")
          localStorage.setItem('update',update);
          localStorage.setItem('email',email);
          localStorage.setItem('pass',pass);
          console.log("updated")
        }
        else{
            setmsg("min length pass and email 5");
            setTimeout(() => {
              setmsg("");
            }, 3000);
        }
        
      }
    
      async function getaccesst(param) {
        console.log(param);
        if (param) {
          let data = { code: param };
          console.log(data);
          const response = await fetch("https://demo-web-pxtm.onrender.com/getaccesstoken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
          }).then((res) => {
            return res.json();
          });
         
        //   console.log(response)
          
        let email=  localStorage.getItem('email')
        localStorage.removeItem('email')
        let pass=localStorage.getItem('pass')
        localStorage.removeItem('pass')
        let pat=response.access_token;
        
        let d=new Date();
        const res= await fetch(
          `https://demo-web-pxtm.onrender.com/api/auth/createwithpa`,
          {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: email, password: pass, token: pat ,date:d}),
          }
        );
        const json = await res.json();
        // console.log(json);
        if (json.success) {
          localStorage.setItem("token", pat);
        //   navigate("/");
        } else {
          setmsg("Either user exists or invalid email");
          setTimeout(() => {
            setmsg("");
          }, 3000);
        }
        }
      }
      async function updateaccesst(param,email,pass) {
        console.log(param);
        if (param) {
          let data = { code: param };
          console.log(data);
          const response = await fetch("https://demo-web-pxtm.onrender.com/getaccesstoken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
          }).then((res) => {
            return res.json();
          });
         
          console.log(response)
          
        
       
        let pat=response.access_token;
        
        let d=new Date();
        const res= await fetch(
          `https://demo-web-pxtm.onrender.com/api/auth/update`,
          {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email:email, token: pat ,date:d}),
          }
        );
        const json = await res.json();
        // console.log(json);
        if (json.success) {
          localStorage.setItem("token", pat);
        //   navigate("/");
        } else {
          setmsg("Either user exists or invalid email");
          setTimeout(() => {
            setmsg("");
          }, 3000);
        }
        }
      }
      return <Notecontext.Provider value={{codefetched,toupdate,updateemail,updatepass,handlelogin,loginwithgithub,getaccesst,updateaccesst,msg,setmsg}}>
        {props.children}
    </Notecontext.Provider>
 };

export default Notestate



