const mongoose=require('mongoose');


const mongoURL="mongodb+srv://Arif2048:Arif20484423@cluster0.4etohll.mongodb.net/githubdata?retryWrites=true&w=majority"
const connecttomongo=()=>{
    mongoose.connect(mongoURL,{family:4}).then(db=>console.log("DB is Connected")).catch((err)=>console.log(err));
}
module.exports=connecttomongo; 