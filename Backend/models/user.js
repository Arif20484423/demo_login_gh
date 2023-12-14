const mongoose=require('mongoose');

const {Schema}= mongoose;

const userSchema= new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    token:{type:String ,required:true},
    date: { type: Date }
})

const User=mongoose.model('user',userSchema);
module.exports=User;  