import mongoose from "mongoose";
const imagedata= mongoose.Schema
let imageinfomation= new imagedata({
    names:{
        type:String,
        required:false
    },
   
    profile:{
        type:String,
        required:true
    },

})
export default mongoose.model('imgdata',imageinfomation)