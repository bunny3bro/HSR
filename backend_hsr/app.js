import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';
import feedback from "./modules/feedback";
import imgdat from "./modules/image";
import multer from "multer";
import nodemailer from "nodemailer"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
// mongoose.connect('mongodb+srv://bhargav3516:Bunny1616@cluster0.ccabgrn.mongodb.net/Cluster0?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://bhargav3516:Bunny1616@cluster0.ccabgrn.mongodb.net/Cluster0?retryWrites=true&w=majority')


.then(() =>app.listen(3535))
.then(() =>
console.log('connected to Data Base 3535 is Done')
)


app.post('/adddatafeed',(req,res,next)=>{
    console.log(req.body.datafeed)
    const {username,usernum,usermail,userchoice,userrating,usercheck,usercomment} = req.body.datafeed
    let usertime = new Date()
    const feed1 = new feedback({
        username,
        usernum,
        usermail,
        userchoice,
        userrating,
        usercheck,
        usercomment,
        usertime,
    }
    )
    // var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhargav3516@gmail.com',
    pass: 'eget daib lpim foak'
  }
});

var mailOptions = {
  from: 'bhargav3516@gmail.com',
  to: usermail,
  subject: 'feedback',
  html: "Mrs/Mr"+" "+username+"<br />"+"Thank You for giving feedback and Your support to us."+
  "<br />"+"If you want more information about Honkai Star Rail, please follow us on:"+
  '<a href="https://hsr.hoyoverse.com/en-us/" >Click Here</a>'+
  "<br />"+'<a href="https://hsr.hoyoverse.com/en-us/" ><img src= "cid:Logo" style="wdith:213px;height:120px;" /></a> '+
  "<br /><br /><br />"+
  "This is a system generated email. Please do not reply to this email.",
  attachments: [{
    filename: 'logo.jpg',
    path: `${__dirname}/public/images/logo.jpg`,
    cid: 'Logo'
  }]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
   return res.status(243).json({msg:"sent"})
  }
});
    feed1.save()
})

app.get('/getfeed',async(req,res,next)=>{
    let feeddata
    try{
        feeddata = await feedback.find()
    }
    catch(err){
        console.log(err)
    }
    if(!feeddata){
        console.log("no log data is found")
    }
return res.status(200).json({feeddata})
}
)


app.delete('/delete-feed/:id',async (req,res,next)=>{
    const _id = req.params.id
    let feeds;
    try{
        feeds = await feedback.findByIdAndRemove(_id);
    }catch(err){
        return console.log(err)
    }
    if(!feeds){
        return res.status(400).json({message:"Unable to delete the feed."})
    }
    return res.status(200).json({message:"deleted."})
}
)


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/images')
    },
    filename: function (req, file, callback) {
      callback(null,file.originalname)
    }
  })
  const upload = multer({ storage: storage })
app.put('/imgupload',upload.single("file"),(req,res,next)=>
{
const profile= (req.file) ? req.file.originalname : null

    const{names}=req.body
    
    const img=new imgdat({
        names,
        profile
    })
    try{
        img.save()
        return res.status(201).json({ msg: 'submited' });
    }
    catch(err)
    {
        console.log('not inserted')
    }
})
app.use(express.static('public'))


app.get('/getimage',async(req,res,next)=>{
let imagedata
try{
    imagedata=await imgdat.find()
}
catch(err)
{
    console.log(err)

}
if(!imagedata)
{
    console.log('user not found');
}

return res.status(200).json({imagedata})
})
