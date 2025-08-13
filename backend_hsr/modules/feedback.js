import mongoose from "mongoose";
const Schema=mongoose.Schema;
let feedbackSchema = new Schema({
    username:{
        type:String,
    },
    usernum:{
        type:String,
    },
    usermail:{
        type:String,
    },
    userchoice:{
        type:String,
    },
    userrating:{
        type:String,
    },
    usercheck:{
        type:String,
    },
    usercomment:{
        type:String,
    },
    usertime:{
        type:String,
    }
});
export default mongoose.model('feedback',feedbackSchema);