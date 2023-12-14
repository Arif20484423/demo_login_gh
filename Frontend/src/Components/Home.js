import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Repo from "./Repo";
const Home = (props) => {
    const [reload, setReload] = useState(false);  
    const navigate=useNavigate();
  const [repos, setRepos] = useState([]);
  const [msg, setMsg] = useState("");
  async function fetchdata(repourl) {
    try {
      //   console.log(localStorage.getItem('token'));
      let data = await fetch(repourl).then((data) => {
        return data.json();
      });
      // console.log(data); 
      setRepos(data);
    } catch (error) {
      console.log("Unable to load data");
    }
  }
  async function fetcher(token) {
    const accessToken =token;
    try {
      //   const accessToken = token;
      const user = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        return response.json();
      });
      // console.log(user)
      if (user.message === "Bad credentials") {
        console.log("Invalid");
        setMsg("Wrong Personal access token");
        // if(!reload){
        //     setReload(true);
        //     window.location.reload();
        // }
      } else {
        
        fetchdata(user.repos_url);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {   
    
    
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null
    ) {
      fetcher(localStorage.getItem("token"));
      props.setLogged(true);
    } else {
      setMsg("Please login first");
      navigate("/signin")
      props.setLogged(false)
    }
  }, []);
  return (
    <div className="container">
      <div className="my-3">
      
      {(repos.length>0)?<h3>{repos[0].owner.login}</h3>:""}
      <div className="my-4 row">
        {repos.length > 0 ? repos.map((rep)=>{
            return <Repo key={rep.id} name={rep.name} fname={rep.full_name} priv={rep.private}/>
        }) : <h3>{msg}</h3>}
      </div>
      </div>
    </div>
  );
};

export default Home;
