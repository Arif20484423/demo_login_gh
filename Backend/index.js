const express= require('express')
const cors=require('cors')
const connecttodb=require('./db')
const port =5000;
const app=express();

const client_id = "d0dd757bce48dbddabce";
const client_secret = "49910e6cff8bd92ff980a08ab196e12b7cd30f02";
app.use(cors());
app.use(express.json())
connecttodb();
app.use('/api/auth',require('./routes/auth'))
app.post('/getaccesstoken',async (req,res)=>{
    let params="?client_id="+client_id+"&client_secret="+client_secret+"&code="+req.body.code;
      let data=await fetch('https://github.com/login/oauth/access_token'+params,{
        method:'POST',
        headers:{
          "Accept":"application/json"
        } 
      }).then((res)=>{
        return res.json(); 
      })
      res.send(data);
})


app.get('/',async (req,res)=>{
    

    console.log();
    res.send("Welcome to the Backend users");
})
app.listen(port,()=>{
    console.log("server started at port 4000");
})